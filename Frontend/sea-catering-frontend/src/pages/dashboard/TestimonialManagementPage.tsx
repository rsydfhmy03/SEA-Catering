import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getAllTestimonials } from '../../store/slices/testimonialManagementSlice';
import { TestimonialsTable } from '../../components/tables/TestimonialsTable';

const TestimonialManagementPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { testimonials, status } = useSelector((state: RootState) => state.testimonialManagement);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllTestimonials());
        }
    }, [status, dispatch]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Testimonial Management</h1>
            <p className="text-gray-600 mb-6">Approve or review customer testimonials here.</p>
            {status === 'loading' && <p>Loading testimonials...</p>}
            {status === 'succeeded' && <TestimonialsTable data={testimonials} />}
        </div>
    );
};

export default TestimonialManagementPage;