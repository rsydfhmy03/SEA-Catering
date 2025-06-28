import { useState } from 'react';
import { submitTestimonial, type NewTestimonialData } from '../../services/api/testimonialsApi';
import toast from 'react-hot-toast';
import { Star } from 'lucide-react';

const StarRating = ({ rating, setRating }: { rating: number, setRating: (r: number) => void }) => {
    return (
        <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-8 w-8 cursor-pointer transition-colors ${rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                />
            ))}
        </div>
    );
};

const TestimonialForm = ({ onTestimonialAdded }: { onTestimonialAdded: () => void }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0 || !name || !message) {
            toast.error('Please fill all fields and provide a rating.');
            return;
        }

        setIsSubmitting(true);
        const data: NewTestimonialData = { customer_name: name, review_message: message, rating };

        try {
            await submitTestimonial(data);
            toast.success('Thank you! Your review has been submitted for approval.');
            setName('');
            setMessage('');
            setRating(0);
            onTestimonialAdded(); // Refresh testimonial list
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Sorry, something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-center mb-6">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="customer_name" className="sr-only">Your Name</label>
                    <input
                        id="customer_name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>
                 <div>
                    <label htmlFor="review_message" className="sr-only">Your Review</label>
                    <textarea
                        id="review_message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your Review Message..."
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>
                <div className="text-center">
                    <label className="block text-gray-700 mb-2">Your Rating</label>
                     <StarRating rating={rating} setRating={setRating} />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400">
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default TestimonialForm;
