import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import dayjs from "dayjs";
import Head from "next/head";
import { useEffect, useState } from "react";
import { db } from "utils/firebase";
import Link from "next/link";

const UsersPage = () => {
  const [members, setMembers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const membersRef = db.collection("servers/iH9XpOWiZ9syXBfWLFYy/members");
      // .orderBy("expiration")
      // .endAt(15);
      const data = await membersRef.get();
      setMembers(data);
      console.log();
    };
    fetchData();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Head>
        <title>Discordstack - Home</title>
      </Head>

      <div className="p-10">
        <TableContainer component={Paper}>
          <Table aria-label="Member table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Member name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Expiration</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {members?.docs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((member) => {
                  const { email, fullName, expiration } = member.data();

                  return (
                    <TableRow key={email}>
                      <TableCell>{fullName}</TableCell>
                      <TableCell align="right">{email}</TableCell>
                      <TableCell align="right">
                        {dayjs(expiration).format("MM-DD-YYYY")}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {members?.docs.length === 0 && (
            <div className="text-gray-700 text-lg text-center w-full">
              Nothing here
            </div>
          )}
          <TablePagination
            rowsPerPageOptions={[15, 25, 100]}
            component="div"
            count={members?.docs.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>

        <Link href="/">
          <Button color="primary" size="large">
            To la home
          </Button>
        </Link>
      </div>
    </>
  );
};

export default UsersPage;
