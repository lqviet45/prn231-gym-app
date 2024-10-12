'use client';

import React, { useEffect, useState } from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserResponseValue } from "@/types";
import { getAllManagers } from "@/lib/actions/user.action";
import { isErrorResponseValue } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import CreateUserDialog from "@/components/shared/dialog/CreateUserDialog";
import PaginationBase from "@/components/shared/PaginationBase";

const UserTableHeader = [
    { name: 'Id' },
    { name: 'Full Name' },
    { name: 'Email' },
    { name: 'Phone Number' },
    { name: 'Action' }
];

const UserTable = () => {
    const [users, setUsers] = useState<UserResponseValue[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalCounts, setTotalCounts] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        getAllManagers(search, 'fullName', 'asc', 'fullName', page, limit)
            .then((response) => {
                if (!isErrorResponseValue(response)) {
                    setUsers(response.value.items);
                    setPage(response.value.pageIndex);
                    setTotalCounts(response.value.totalCount);
                    setLimit(response.value.pageSize);
                    setHasNextPage(response.value.hasNextPage);
                    setHasPrevPage(response.value.hasPreviousPage);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after fetching data
            });
    }, [page, search]);

    return (
        <Card>
            <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle>Manager Dashboard</CardTitle>
                <CreateUserDialog />
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {UserTableHeader.map((header, index) => (
                                <TableHead key={index}>{header.name}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    <Skeleton className="w-full h-[30px] rounded-full" />
                                </TableCell>
                            </TableRow>
                        ) : users && users.length > 0 ? (
                            users.map((user, index) => (
                                <TableRow key={index} className="border-b">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell className="flex gap-3">
                                        <Button className="bg-blue-200 text-white px-2 py-1 rounded">
                                            <Link href={`/admin/dashboard/manager/${user.id}`}>
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button className="bg-red-400 text-white px-2 py-1 rounded">
                                            <Link href={`/admin/dashboard/manager/${user.id}`}>
                                                Delete
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    No managers found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <PaginationBase
                    page={page}
                    setPage={setPage}
                    totalCounts={totalCounts}
                    limit={limit}
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                />
            </CardFooter>
        </Card>
    );
};

export default UserTable;
