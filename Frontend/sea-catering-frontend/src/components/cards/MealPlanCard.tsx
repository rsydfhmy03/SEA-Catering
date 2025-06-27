import type { MealPlan } from '../../services/api/mealPlansApi';
import { ChevronRight } from 'lucide-react';

interface MealPlanCardProps {
  plan: MealPlan;
  onSeeDetails: (plan: MealPlan) => void;
}

const MealPlanCard = ({ plan, onSeeDetails }: MealPlanCardProps) => {
    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(parseFloat(price));
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-2 transition-transform duration-300">
            <img 
                className="w-full h-48 object-cover" 
                src={plan.image_url} 
                alt={plan.name} 
                onError={(e) => { e.currentTarget.src = `https://placehold.co/600x400/e0f2f1/105D4B?text=${plan.name}` }}
            />
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{plan.description}</p>
                <div className="mt-auto">
                    <p className="text-lg font-semibold text-green-600 mb-4">{formatPrice(plan.price)} / meal</p>
                    <button 
                        onClick={() => onSeeDetails(plan)}
                        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
                    >
                        See More Details <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MealPlanCard;
