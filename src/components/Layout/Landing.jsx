import React from "react";
const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto text-center mb-10">
          <h1 className="mb-4">Welcome to Trello Clone</h1>
          <p className="text-lg mb-8">
            A simple and intuitive task management to help you organize your
            work.
          </p>
          <div>Firebase Login functionality</div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-blue-700 mb-3">Create Boards</h2>
              <p>
                Create boards for different tasks to keep everything organized.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-blue-700 mb-3">Add Lists</h2>
              <p>
                Break down your work into lists to represent different stages of
                tasks.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-blue-700 mb-3">Manage Cards</h2>
              <p>
                Add cards to lists and drag them around as task progresses
                through different stages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
