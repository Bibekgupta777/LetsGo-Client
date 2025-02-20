import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch all payments
  const fetchPayments = async () => {
    try {
      const response = await axios.get("/api/payment/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(response.data.data);
      setFilteredPayments(response.data.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Search payments by booking ID or user ID
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredPayments(
      payments.filter(
        (payment) =>
          payment.booking_id.toLowerCase().includes(term) ||
          payment.user_id.toLowerCase().includes(term)
      )
    );
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Management</h1>
        <input
          type="text"
          placeholder="Search by Booking ID or User ID"
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded px-4 py-2 w-72"
        />
      </div>

      {/* Payment Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell>{payment.booking_id}</TableCell>
                <TableCell>{payment.user_id}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.payment_method}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSelectedPayment(payment);
                      setIsDetailsModalOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>


    </div>
  );
};

export default PaymentManagement;