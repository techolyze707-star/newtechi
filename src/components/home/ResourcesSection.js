import React from 'react';

const ActionButton = ({ icon, text, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FFD11A] hover:underline text-sm">
    <span dangerouslySetInnerHTML={{ __html: icon }} />
    {text}
  </a>
);

const ResourceCard = ({ icon, title, actions }) => (
  <div className="bg-[#1A1A1A] rounded-lg p-6 flex flex-col items-start gap-4 w-full max-w-[400px]">
    <div dangerouslySetInnerHTML={{ __html: icon }} />
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <div className="flex flex-col gap-2">
      {actions.map((action, idx) => (
        <ActionButton key={idx} {...action} />
      ))}
    </div>
  </div>
);

const ResourcesSection = () => {
  const viewAllIcon = `<svg id="324:5209" layer-name="Icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px]"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.875 3.125L16.25 3.125C16.4158 3.125 16.5747 3.19085 16.6919 3.30806C16.8092 3.42527 16.875 3.58424 16.875 3.75V13.125C16.875 13.4702 16.5952 13.75 16.25 13.75C15.9048 13.75 15.625 13.4702 15.625 13.125V5.25888L4.19194 16.6919C3.94786 16.936 3.55214 16.936 3.30806 16.6919C3.06398 16.4479 3.06398 16.0521 3.30806 15.8081L14.7411 4.375L6.875 4.375C6.52982 4.375 6.25 4.09518 6.25 3.75C6.25 3.40482 6.52982 3.125 6.875 3.125Z" fill="#FFD11A"></path> </svg>`;

  const ebookIcon = `<svg id="324:5214" layer-name="Icon" width="60" height="61" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[60px] h-[60px] max-sm:w-[50px] max-sm:h-[50px]"> <path d="M28.5 35C28.5 26.3674 53.6449 11.001 52.4594 16.7595C49.9819 28.7935 49.9819 41.2065 52.4594 53.2405C53.6449 58.999 28.5 43.6326 28.5 35Z" fill="#FFD11A"></path> <path d="M31.5 26C31.5 34.6326 6.35514 49.999 7.54064 44.2405C10.0181 32.2065 10.0181 19.7935 7.54064 7.75952C6.35514 2.00102 31.5 17.3674 31.5 26Z" fill="#404040"></path> </svg>`;

  const downloadIcon = `<svg id="324:5223" layer-name="Icon" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px]"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.375 3.125L16.75 3.125C16.9158 3.125 17.0747 3.19085 17.1919 3.30806C17.3092 3.42527 17.375 3.58424 17.375 3.75V13.125C17.375 13.4702 17.0952 13.75 16.75 13.75C16.4048 13.75 16.125 13.4702 16.125 13.125V5.25888L4.69194 16.6919C4.44786 16.936 4.05214 16.936 3.80806 16.6919C3.56398 16.4479 3.56398 16.0521 3.80806 15.8081L15.2411 4.375L7.375 4.375C7.02982 4.375 6.75 4.09518 6.75 3.75C6.75 3.40482 7.02982 3.125 7.375 3.125Z" fill="#FFD11A"></path> </svg>`;

  const previewIcon = `<svg id="324:5249" layer-name="Icon" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px]"> <path d="M18.0023 9.52301C18.2153 9.79098 18.3332 10.1391 18.3332 10.5001C18.3332 10.8611 18.2153 11.2092 18.0023 11.4772C16.6536 13.1251 13.5836 16.3334 9.99984 16.3334C6.4161 16.3334 3.34616 13.1251 1.99744 11.4772C1.78442 11.2092 1.6665 10.8611 1.6665 10.5001C1.6665 10.1391 1.78442 9.79098 1.99744 9.52301C3.34616 7.87509 6.4161 4.66675 9.99984 4.66675C13.5836 4.66675 16.6536 7.87509 18.0023 9.52301Z" stroke="#FFD11A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.0003 13.0925C11.4191 13.0925 12.5693 11.9318 12.5693 10.5C12.5693 9.06814 11.4191 7.90741 10.0003 7.90741C8.58145 7.90741 7.43127 9.06814 7.43127 10.5C7.43127 11.9318 8.58145 13.0925 10.0003 13.0925Z" stroke="#FFD11A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg>`;

  const whitepaperIcon = `<svg id="324:5257" layer-name="Icon" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[60px] h-[60px] max-sm:w-[50px] max-sm:h-[50px]"> <path d="M30 6V54L9 42V18L30 6Z" fill="#FFD11A"></path> <path d="M51 6V54L30 42V18L51 6Z" fill="#404040"></path> </svg>`;

  const whitepaperDownloadIcon = `<svg id="324:5266" layer-name="Icon" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px]"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.375 3.625L16.75 3.625C16.9158 3.625 17.0747 3.69085 17.1919 3.80806C17.3092 3.92527 17.375 4.08424 17.375 4.25V13.625C17.375 13.9702 17.0952 14.25 16.75 14.25C16.4048 14.25 16.125 13.9702 16.125 13.625V5.75888L4.69194 17.1919C4.44786 17.436 4.05214 17.436 3.80806 17.1919C3.56398 16.9479 3.56398 16.5521 3.80806 16.3081L15.2411 4.875L7.375 4.875C7.02982 4.875 6.75 4.59518 6.75 4.25C6.75 3.90482 7.02982 3.625 7.375 3.625Z" fill="#FFD11A"></path> </svg>`;

  const whitepaperPreviewIcon = `<svg id="324:5292" layer-name="Icon" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px]"> <path d="M18.0023 9.52301C18.2153 9.79098 18.3332 10.1391 18.3332 10.5001C18.3332 10.8611 18.2153 11.2092 18.0023 11.4772C16.6536 13.1251 13.5836 16.3334 9.99984 16.3334C6.4161 16.3334 3.34616 13.1251 1.99744 11.4772C1.78442 11.2092 1.6665 10.8611 1.6665 10.5001C1.6665 10.1391 1.78442 9.79098 1.99744 9.52301C3.34616 7.87509 6.4161 4.66675 9.99984 4.66675C13.5836 4.66675 16.6536 7.87509 18.0023 9.52301Z" stroke="#FFD11A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.0003 13.0925C11.4191 13.0925 12.5693 11.9318 12.5693 10.5C12.5693 9.06814 11.4191 7.90741 10.0003 7.90741C8.58145 7.90741 7.43127 9.06814 7.43127 10.5C7.43127 11.9318 8.58145 13.0925 10.0003 13.0925Z" stroke="#FFD11A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg>`;

  return (
    <section className="py-12 bg-black text-white flex flex-col items-center">
      <div className="w-full max-w-6xl px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Resources</h2>
          <a href="#" className="flex items-center gap-2 text-[#FFD11A] hover:underline text-sm" dangerouslySetInnerHTML={{ __html: viewAllIcon }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ResourceCard
            icon={ebookIcon}
            title="Ebook"
            actions={[
              { icon: previewIcon, text: 'Preview', link: '#' },
              { icon: downloadIcon, text: 'Download', link: '#' },
            ]}
          />
          <ResourceCard
            icon={whitepaperIcon}
            title="Whitepaper"
            actions={[
              { icon: whitepaperPreviewIcon, text: 'Preview', link: '#' },
              { icon: whitepaperDownloadIcon, text: 'Download', link: '#' },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
