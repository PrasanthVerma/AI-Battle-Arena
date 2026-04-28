import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// Only accessible when logged in — redirects to /login otherwise
export function ProtectedRoute() {
    const { user, loading } = useSelector((state) => state.auth);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

// Only accessible when NOT logged in — redirects to /home if already logged in
export function GuestRoute() {
    const { user, loading } = useSelector((state) => state.auth);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
            </div>
        );
    }

    return user ? <Navigate to="/home" replace /> : <Outlet />;
}
