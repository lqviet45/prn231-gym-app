import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./table"; // Import your table components
import Container from "./container"; // Import the Container component

interface Subscription {
    id: string;
    name: string;
    totalWorkoutTime: string;
    group: string;
    price: number;
    totalMonth: number;
}

interface CartProps {
    subscriptions: Subscription[]; // Array of subscriptions to display in the cart
}

const Cart: React.FC<CartProps> = ({ subscriptions }) => {
    return (
        <Container className="bg-white shadow-md rounded-lg p-4">
            <Table>
                <TableHeader>
                    <TableRow className='text-2xl'>
                        <TableHead>Name</TableHead>
                        <TableHead>Workout Time</TableHead>
                        <TableHead>Group</TableHead>
                        <TableHead>Month</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscriptions.map((subscription) => (
                        <TableRow className='text-xl' key={subscription.id}>
                            <TableCell className='text-[#2519A4] text-2xl'>{subscription.name}</TableCell>
                            <TableCell>{subscription.totalWorkoutTime}</TableCell>
                            <TableCell>{subscription.group}</TableCell>
                            <TableCell>{subscription.totalMonth}</TableCell>
                            <TableCell>{subscription.price} VND</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default Cart;
