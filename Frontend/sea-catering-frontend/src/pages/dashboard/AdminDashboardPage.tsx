import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getDashboardMetrics } from '../../store/slices/adminSlice';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const StatCard = ({ title, value }: { title: string, value: string | number }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="text-gray-500">{title}</h4>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);

const AdminDashboardPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { metrics, status } = useSelector((state: RootState) => state.admin);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    const fetchMetrics = () => {
        const params = {
            startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
            endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined
        };
        dispatch(getDashboardMetrics(params));
    };

    useEffect(() => {
        fetchMetrics();
    }, [dispatch]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Admin Metrics</h1>
            <div className="flex items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow">
                <ReactDatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => setDateRange(update)}
                    isClearable={true}
                    placeholderText="Select date range"
                    className="border p-2 rounded-md"
                />
                <button onClick={fetchMetrics} className="bg-green-600 text-white px-4 py-2 rounded-md">Filter</button>
            </div>

            {status === 'loading' && <p>Loading metrics...</p>}
            {metrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="New Subscriptions" value={metrics.newSubscriptions} />
                    <StatCard title="Monthly Recurring Revenue" value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(metrics.mrr)} />
                    <StatCard title="Reactivations" value={metrics.reactivations} />
                    <StatCard title="Total Active Subscriptions" value={metrics.totalActiveSubscriptions} />
                </div>
            )}
        </div>
    );
};

export default AdminDashboardPage;
