import GuardsCategoryForm from '@/components/DashboardComponents/Setup/GuardsCategoryForm';

const AddGuardsCategoryPage = () => {
    return (
        <div className="min-h-screen bg-formBGBlue flex flex-col items-center justify-center w-full">
            {/* Header with breadcrumb */}
            <div className="w-full max-w-5xl px-4 pt-4">
                <aside className="bg-white border-b rounded-xl border-gray-200">
                    <div className="px-6 py-4">
                        <article className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Dashboard</span>
                            <span>&gt;</span>
                            <span className="text-gray-900 font-medium">Add Guards Category</span>
                        </article>
                    </div>
                </aside>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-md mt-8 p-8">
                <GuardsCategoryForm />
            </div>
        </div>
    );
};

export default AddGuardsCategoryPage; 