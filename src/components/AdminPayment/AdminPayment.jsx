import React from "react";
import AddCustomer from "./AddCustomer";
import ViewCustomer from "./ViewCustomer";


const AdminPayment = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Customer Management</h1>
        <AddCustomer />
        <hr className="my-8" />
        <ViewCustomer />
        
      
     
        
      </div>
    </div>
  );
};

export default AdminPayment;
