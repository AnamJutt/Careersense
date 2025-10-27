import { FaTwitter, FaGithub, FaFacebook } from "react-icons/fa";

const BottomFooter = () => {
  return (
    <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-600">
      <p>
        <span className="font-bold text-blue-600 text-xl">Career</span>
        <span className="font-bold text-green-600 text-xl">Sense</span> © copyright 2025
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mt-3 text-gray-500">
        <a href="#" className="hover:text-blue-500"><FaTwitter size={18} /></a>
        <a href="#" className="hover:text-gray-800"><FaGithub size={18} /></a>
        <a href="#" className="hover:text-blue-700"><FaFacebook size={18} /></a>
      </div>
    </div>
  );
};

export default BottomFooter;
