import { useState, useEffect } from 'react';
import { getMealPlans, type MealPlan } from '../../services/api/mealPlansApi';
import MealPlanCard from '../../components/cards/MealPlanCard';
import Modal from '../../components/ui/Modal';

const MenuPage = () => {
    const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setIsLoading(true);
                const plans = await getMealPlans();
                setMealPlans(plans);
                setError(null);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError('Oops! Failed to load our meal plans. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const handleOpenModal = (plan: MealPlan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPlan(null);
    };

    if (isLoading) {
        return <div className="text-center py-20">Loading our delicious plans...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-800">Our Meal Plans</h1>
                    <p className="text-lg text-gray-600 mt-2">Choose the perfect plan that fits your lifestyle and goals.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mealPlans.map((plan) => (
                        <MealPlanCard key={plan.id} plan={plan} onSeeDetails={handleOpenModal} />
                    ))}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedPlan?.name}>
                {selectedPlan && (
                    <div>
                         <img 
                            className="w-full h-56 rounded-lg object-cover mb-4" 
                            src={selectedPlan.image_url} 
                            alt={selectedPlan.name} 
                            onError={(e) => { e.currentTarget.src = `https://placehold.co/600x400/e0f2f1/105D4B?text=${selectedPlan.name}` }}
                        />
                        <p className="text-gray-700 mb-4">{selectedPlan.description}</p>
                        <p className="text-2xl font-bold text-green-600">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(selectedPlan.price))}
                            <span className="text-base font-normal text-gray-500"> / meal</span>
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MenuPage;
