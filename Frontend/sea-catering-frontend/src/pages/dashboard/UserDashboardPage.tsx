import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getUserSubscriptions } from '../../store/slices/subscriptionsSlice';
import { cancelSubscription, pauseSubscription, type Subscription } from '../../services/api/subscriptionsApi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import ReactDatePicker from 'react-datepicker';

// Komponen Card untuk setiap langganan
const SubscriptionCard = ({ sub, onRefetch }: { sub: Subscription, onRefetch: () => void }) => {
    // State untuk modal
    const [isPauseModalOpen, setPauseModalOpen] = useState(false);
    const [isCancelModalOpen, setCancelModalOpen] = useState(false);
    const [pauseDates, setPauseDates] = useState<[Date | null, Date | null]>([null, null]);

    const handlePause = async () => {
        if (!pauseDates[0] || !pauseDates[1]) {
            toast.error("Please select a date range.");
            return;
        }
        try {
            await pauseSubscription(sub.id, {
                pause_start_date: format(pauseDates[0], 'yyyy-MM-dd'),
                pause_end_date: format(pauseDates[1], 'yyyy-MM-dd'),
            });
            toast.success("Subscription paused successfully.");
            setPauseModalOpen(false);
            onRefetch();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Failed to pause subscription.");
        }
    };

    const handleCancel = async () => {
         try {
            await cancelSubscription(sub.id);
            toast.success("Subscription cancelled.");
            setCancelModalOpen(false);
            onRefetch();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Failed to cancel subscription.");
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg">{sub.plan_name}</h3>
            <p className={`capitalize font-semibold ${sub.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>{sub.status}</p>
            <p className="text-sm text-gray-500">Active from {format(new Date(sub.start_date), 'dd MMM yyyy')} to {format(new Date(sub.end_date), 'dd MMM yyyy')}</p>
            {/* ... detail lain ... */}
            <div className="mt-4 flex gap-2">
                <button onClick={() => setPauseModalOpen(true)} className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded">Pause</button>
                <button onClick={() => setCancelModalOpen(true)} className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded">Cancel</button>
            </div>

            {/* Modal Pause */}
            {isPauseModalOpen && (
                 <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h4 className="font-bold text-lg mb-4">Pause Subscription</h4>
                        <p>Select the date range to pause your subscription.</p>
                        <ReactDatePicker selectsRange startDate={pauseDates[0]} endDate={pauseDates[1]} onChange={(update) => setPauseDates(update)} inline/>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setPauseModalOpen(false)}>Cancel</button>
                            <button onClick={handlePause}>Confirm Pause</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal Cancel */}
             {isCancelModalOpen && (
                 <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h4 className="font-bold text-lg mb-4">Are you sure?</h4>
                        <p>This will permanently cancel your subscription.</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setCancelModalOpen(false)}>No</button>
                            <button onClick={handleCancel}>Yes, Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


const UserDashboardPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: subscriptions, status } = useSelector((state: RootState) => state.subscriptions);

    const fetchSubs = () => {
        dispatch(getUserSubscriptions());
    };
    
    useEffect(() => {
        fetchSubs();
    }, [dispatch]);
    
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Subscriptions</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && subscriptions.length === 0 && <p>You have no active subscriptions.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subscriptions.map(sub => <SubscriptionCard key={sub.id} sub={sub} onRefetch={fetchSubs} />)}
            </div>
        </div>
    );
};

export default UserDashboardPage;
