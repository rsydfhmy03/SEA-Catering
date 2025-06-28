// src/pages/public/ContactPage.tsx
import { useState } from 'react';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Clock, 
    Send, 
    MessageCircle, 
    CheckCircle,
    User,
    Building,
    Star,
    Award,
    Users,
    Utensils
} from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            subject: '',
            message: '',
            inquiryType: 'general'
        });
        setIsSubmitting(false);
    };

    const contactInfo = [
        {
            icon: Phone,
            title: 'Call Us',
            primary: '08123456789',
            secondary: 'Mon-Fri, 8AM-8PM',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            icon: Mail,
            title: 'Email Us',
            primary: 'hello@seacatering.com',
            secondary: 'We reply within 24 hours',
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            primary: 'Jakarta, Indonesia',
            secondary: 'Office hours: 9AM-6PM',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600'
        },
        {
            icon: Clock,
            title: 'Business Hours',
            primary: '24/7 Available',
            secondary: 'Customer support',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600'
        }
    ];

    const inquiryTypes = [
        { value: 'general', label: 'General Inquiry' },
        { value: 'catering', label: 'Catering Services' },
        { value: 'subscription', label: 'Meal Subscription' },
        { value: 'partnership', label: 'Business Partnership' },
        { value: 'support', label: 'Technical Support' },
        { value: 'feedback', label: 'Feedback & Suggestions' }
    ];

    const stats = [
        { icon: Users, number: '10,000+', label: 'Happy Customers' },
        { icon: Utensils, number: '50,000+', label: 'Meals Delivered' },
        { icon: Award, number: '99%', label: 'Satisfaction Rate' },
        { icon: Star, number: '4.9/5', label: 'Average Rating' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
            {/* Spacing for fixed navbar */}
            <div className="pt-24"></div>

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <MessageCircle className="h-4 w-4" />
                            <span>We'd love to hear from you</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent mb-6">
                            Get in Touch
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Ready to elevate your dining experience? Let's discuss how SEA Catering 
                            can bring exceptional flavors to your next event or daily meals.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            {stats.map((stat, index) => (
                                <div 
                                    key={index}
                                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <stat.icon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((info, index) => (
                            <div 
                                key={index}
                                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`w-16 h-16 ${info.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <info.icon className={`h-8 w-8 ${info.iconColor}`} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                                <p className="text-lg font-medium text-gray-800 mb-2">{info.primary}</p>
                                <p className="text-sm text-gray-500">{info.secondary}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Manager Info */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-xl border border-gray-100">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                                <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                                    placeholder="Your full name"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                                    placeholder="+62 812 3456 789"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Company (Optional)
                                            </label>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                                    placeholder="Your company name"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Inquiry Type
                                        </label>
                                        <select
                                            name="inquiryType"
                                            value={formData.inquiryType}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                        >
                                            {inquiryTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                            placeholder="Brief subject of your inquiry"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-none"
                                            placeholder="Tell us more about your requirements..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5" />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Manager Info & CTA */}
                        <div className="space-y-8">
                            {/* Manager Card */}
                            <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 rounded-3xl text-white shadow-2xl">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                                        <User className="h-12 w-12 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Meet Brian</h3>
                                    <p className="text-green-100 mb-6">Operations Manager</p>
                                    <div className="space-y-3 text-left">
                                        <div className="flex items-center space-x-3">
                                            <Phone className="h-5 w-5 text-green-200" />
                                            <span className="text-green-100">08123456789</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Mail className="h-5 w-5 text-green-200" />
                                            <span className="text-green-100">brian@seacatering.com</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Clock className="h-5 w-5 text-green-200" />
                                            <span className="text-green-100">Available 24/7</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                                        <p className="text-sm text-green-100 italic">
                                            "I'm here to help you create the perfect dining experience. 
                                            Let's discuss your catering needs!"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Contact */}
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                                <h4 className="text-xl font-bold text-gray-900 mb-4">Need Immediate Assistance?</h4>
                                <p className="text-gray-600 mb-6">
                                    For urgent inquiries or immediate support, reach out to us directly.
                                </p>
                                <div className="space-y-3">
                                    <a 
                                        href="tel:08123456789"
                                        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <Phone className="h-5 w-5" />
                                        <span>Call Now</span>
                                    </a>
                                    <a 
                                        href="mailto:hello@seacatering.com"
                                        className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <Mail className="h-5 w-5" />
                                        <span>Send Email</span>
                                    </a>
                                </div>
                            </div>

                            {/* Success Guarantee */}
                            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border border-orange-200">
                                <div className="flex items-center space-x-3 mb-3">
                                    <CheckCircle className="h-6 w-6 text-orange-600" />
                                    <h5 className="font-bold text-orange-900">Response Guarantee</h5>
                                </div>
                                <p className="text-sm text-orange-800">
                                    We respond to all inquiries within 24 hours during business days. 
                                    Urgent requests are handled immediately.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Start Your Culinary Journey?
                    </h2>
                    <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust SEA Catering for their dining needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="/menu"
                            className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            View Our Menu
                        </a>
                        <a 
                            href="/subscription"
                            className="bg-green-800 text-white hover:bg-green-900 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Start Subscription
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;