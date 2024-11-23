export const validateLink = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube|youtu|vimeo)\.(com|be)\/.*$/;
    return regex.test(url);
  };
  
  export const formatFileSize = (sizeInBytes) => {
    if (!sizeInBytes) return "N/A";
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB >= 1024
      ? `${(sizeInMB / 1024).toFixed(2)} GB`
      : `${sizeInMB.toFixed(2)} MB`;
  };
  