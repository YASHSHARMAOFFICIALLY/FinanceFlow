export default function ProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] dark:bg-[#091116]">
      <div className="bg-white dark:bg-[#142028] p-8 rounded-2xl shadow-xl w-[400px]">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          User Profile
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium dark:text-white">Bhavishya Verma</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Plan</p>
            <p className="font-medium dark:text-white">Premium</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium dark:text-white">
              user@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}