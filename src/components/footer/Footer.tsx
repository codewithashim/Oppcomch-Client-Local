const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-row">
      <p className="mb-4 text-center text-sm font-medium text-gray-600 sm:!mb-0 md:text-lg">
        <span className="mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base">
          ©{new Date().getFullYear()} Comilla Medical College Hospital All Rights Reserved. Software V.1.0 By Codewithashim
        </span>
      </p>
      <div>
        
      </div>
    </div>
  );
};

export default Footer;
