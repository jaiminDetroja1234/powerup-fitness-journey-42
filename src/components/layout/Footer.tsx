
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-powerDark text-white py-10 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">POWER-UP 365</h3>
            <p className="text-gray-300 text-sm">
              An intelligent and immersive fitness application designed to revolutionize personal health management.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/workouts" className="hover:text-primary transition-colors">Personalized Workouts</Link></li>
              <li><Link to="/nutrition" className="hover:text-primary transition-colors">Adaptive Meal Plans</Link></li>
              <li><Link to="/challenges" className="hover:text-primary transition-colors">Challenges</Link></li>
              <li><Link to="/community" className="hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} POWER-UP 365. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Developed by Jaimin Detroja (22CP081) & Krish Kakadiya (22CP077)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
