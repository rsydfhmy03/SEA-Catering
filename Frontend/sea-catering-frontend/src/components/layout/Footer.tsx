const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h3 className="text-xl font-bold">SEA Catering</h3>
                        <p className="text-gray-400">Healthy Meals, Anytime, Anywhere</p>
                    </div>
                    <div className="text-center md:text-right">
                        <h4 className="font-semibold mb-2">Contact Details</h4>
                        <p className="text-gray-400">Manager: Brian</p>
                        <p className="text-gray-400">Phone: 08123456789</p>
                    </div>
                </div>
                <div className="text-center text-gray-500 border-t border-gray-700 mt-8 pt-4">
                    <p>&copy; {currentYear} SEA Catering. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
