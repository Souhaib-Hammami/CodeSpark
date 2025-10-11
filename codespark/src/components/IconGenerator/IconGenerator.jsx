import 'file-icons-js/css/style.css'

const IconGenerator = ({ extension, color }) => {
  // convert extension to CSS class
  const iconClass = `${extension}-icon`; // py → python-icon, js → js-icon, etc.

  return (
    <div
      className={iconClass}
      style={{
        color: color || 'inherit',     // Icon color
      }}
      title={`.${extension}`}>
    </div>
  );
};

export default IconGenerator;



