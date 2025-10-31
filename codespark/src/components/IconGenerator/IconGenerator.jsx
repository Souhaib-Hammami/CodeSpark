// import 'file-icons-js/css/style.css'

// const IconGenerator = ({ extension, color }) => {
//   // convert extension to CSS class
//   const iconClass = `${extension}-icon`; // py → python-icon, js → js-icon, etc.

//   return (
//     <div
//       className={iconClass}
//       style={{
//         color: color || 'inherit',     // Icon color
//       }}
//       title={`.${extension}`}>
//     </div>
//   );
// };


// export default IconGenerator;


import 'file-icons-js/css/style.css';
import { getClass } from 'file-icons-js';

const IconGenerator = ({ filename }) => {
  // Get the icon class for the given filename
  const iconClass = getClass(filename) || 'fi fi-file'; // fallback

  return (
    <div
      className={iconClass}
      style={{ 
        
        marginLeft: '18px',
         color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')


        //color: '#FF5E0E',       // first color


       }}
    />
  );
};

export default IconGenerator;

