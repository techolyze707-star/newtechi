'use client';

import { useMemo, useState } from 'react';

const YOUTUBE_API_KEY = 'YOUR_API_KEY_HERE';

const SPEEDS = [1.25, 1.5, 1.75, 2.0];

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function extractPlaylistId(url) {
  if (!url || !isValidHttpUrl(url)) return '';

  const parsed = new URL(url);

  const directList = parsed.searchParams.get('list');
  if (directList) {
    return directList;
  }

  // Handle URLs where the list ID may appear after hash fragments.
  const hashMatch = parsed.hash.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  if (hashMatch?.[1]) {
    return hashMatch[1];
  }

  return '';
}

export function parseISO8601Duration(durationString) {
  const match = String(durationString).match(/^P(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?)?$/);
  if (!match) return 0;

  const days = Number(match[1] || 0);
  const hours = Number(match[2] || 0);
  const minutes = Number(match[3] || 0);
  const seconds = Number(match[4] || 0);

  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}

function formatSeconds(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const days = Math.floor(safe / 86400);
  const hours = Math.floor((safe % 86400) / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

function chunkArray(arr, chunkSize) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function fetchPlaylistData(playlistId) {
  const videoIds = [];
  let nextPageToken = '';

  // Fetch all playlist items using nextPageToken pagination.
  while (true) {
    const playlistUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    playlistUrl.searchParams.set('part', 'contentDetails');
    playlistUrl.searchParams.set('playlistId', playlistId);
    playlistUrl.searchParams.set('maxResults', '50');
    playlistUrl.searchParams.set('key', YOUTUBE_API_KEY);
    if (nextPageToken) {
      playlistUrl.searchParams.set('pageToken', nextPageToken);
    }

    const response = await fetch(playlistUrl.toString());
    const payload = await response.json();

    if (!response.ok) {
      const message = payload?.error?.message || 'Failed to fetch playlist items.';
      throw new Error(message);
    }

    const items = payload?.items || [];
    items.forEach((item) => {
      const videoId = item?.contentDetails?.videoId;
      if (videoId) {
        videoIds.push(videoId);
      }
    });

    nextPageToken = payload?.nextPageToken || '';
    if (!nextPageToken) break;
  }

  if (!videoIds.length) {
    throw new Error('No public videos were found in this playlist.');
  }

  const durations = [];
  const batches = chunkArray(videoIds, 50);

  for (const batch of batches) {
    const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    videosUrl.searchParams.set('part', 'contentDetails');
    videosUrl.searchParams.set('id', batch.join(','));
    videosUrl.searchParams.set('maxResults', '50');
    videosUrl.searchParams.set('key', YOUTUBE_API_KEY);

    const response = await fetch(videosUrl.toString());
    const payload = await response.json();

    if (!response.ok) {
      const message = payload?.error?.message || 'Failed to fetch video durations.';
      throw new Error(message);
    }

    const items = payload?.items || [];
    items.forEach((item) => {
      const duration = item?.contentDetails?.duration;
      durations.push(parseISO8601Duration(duration));
    });
  }

  return {
    totalVideos: durations.length,
    totalSeconds: durations.reduce((sum, seconds) => sum + seconds, 0),
  };
}

export default function YoutubePlaylistLengthCalculatorClient() {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const speedDurations = useMemo(() => {
    if (!result) return [];
    return SPEEDS.map((speed) => ({
      speed,
      label: `${speed.toFixed(2)}x`,
      value: formatSeconds(result.totalSeconds / speed),
    }));
  }, [result]);

  async function handleCalculate() {
    setError('');
    setResult(null);

    const trimmed = playlistUrl.trim();
    if (!trimmed) {
      setError('Please paste a YouTube playlist link first.');
      return;
    }

    const playlistId = extractPlaylistId(trimmed);
    if (!playlistId) {
      setError('Invalid link. Please provide a YouTube playlist URL containing a list= parameter.');
      return;
    }

    if (YOUTUBE_API_KEY === 'YOUR_API_KEY_HERE') {
      setError('Add your YouTube Data API key in the YOUTUBE_API_KEY constant before using this tool.');
      return;
    }

    setLoading(true);
    try {
      const data = await fetchPlaylistData(playlistId);
      const average = data.totalVideos ? Math.floor(data.totalSeconds / data.totalVideos) : 0;

      setResult({
        totalVideos: data.totalVideos,
        totalSeconds: data.totalSeconds,
        averageSeconds: average,
      });
    } catch (requestError) {
      const message = requestError?.message || 'Unable to calculate playlist duration.';
      if (/playlistItemsNotAccessible|private|forbidden/i.test(message)) {
        setError('This playlist appears private or inaccessible. Make sure it is public and try again.');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="g-px pb-12 pt-2">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 md:p-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
          YouTube Playlist Length Calculator
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-700 dark:text-neutral-300 md:text-base">
          Built for students and learners who want quick study planning. Calculate total playlist watch time at
          normal and faster playback speeds instantly.
        </p>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            Paste YouTube Playlist Link here...
          </label>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={playlistUrl}
              onChange={(event) => setPlaylistUrl(event.target.value)}
              placeholder="https://www.youtube.com/playlist?list=..."
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none ring-yellow-300 placeholder:text-neutral-400 focus:ring dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
            />
            <button
              type="button"
              onClick={handleCalculate}
              disabled={loading}
              className="rounded-lg bg-yellow-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Calculating...' : 'Calculate Length'}
            </button>
          </div>

          {loading && (
            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900 dark:border-neutral-600 dark:border-t-white" />
              Fetching playlist data from YouTube API...
            </div>
          )}

          <div className={`${error ? 'mt-4 block' : 'hidden'} rounded-lg border border-red-300 bg-red-50 p-3 text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300`}>
            {error}
          </div>
        </div>

        {result && (
          <div className="mt-7 rounded-xl border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/50">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Results Panel</h2>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950/60">
                <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Total Number of Videos</p>
                <p className="mt-2 text-2xl font-extrabold text-neutral-900 dark:text-white">{result.totalVideos}</p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950/60">
                <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Average Video Length</p>
                <p className="mt-2 text-sm font-bold text-neutral-900 dark:text-white">{formatSeconds(result.averageSeconds)}</p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950/60">
                <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Total Playlist Duration</p>
                <p className="mt-2 text-sm font-bold text-neutral-900 dark:text-white">{formatSeconds(result.totalSeconds)}</p>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/60 dark:bg-yellow-950/20">
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-yellow-900 dark:text-yellow-200">Speed Up</h3>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {speedDurations.map((item) => (
                  <div key={item.speed} className="rounded-md border border-yellow-200 bg-white p-3 dark:border-yellow-900/60 dark:bg-neutral-950/60">
                    <p className="text-xs font-semibold text-yellow-800 dark:text-yellow-200">{item.label}</p>
                    <p className="mt-1 text-xs font-bold text-neutral-900 dark:text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
