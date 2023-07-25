import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./index.css";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Icon,
  IconButton,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Avatar from "@mui/material/Avatar";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

export function CalendarScreen() {
  const weeks = generateCalendar(getToday());
  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;
  return (
    <Box display="flex" height="100%" alignItems="stretch">
      <Box
        borderRight={"5px solid rgb(244, 244, 244) !important"}
        width={"16em"}
        padding={"8px 16px"}
      >
        <h2> Agenda React</h2>
        <Button variant="contained" color="primary">
          Novo evento
        </Button>
        <Box marginTop={"64px"}>
          <h3> Agenda</h3>
          <FormControlLabel control={<Checkbox />} label="Pessoal" />
          <FormControlLabel control={<Checkbox />} label="Trabalho" />
        </Box>
      </Box>
      <TableContainer component={"div"}>
        <Box display={"flex"} alignItems={"center"} padding={"8px 16px"}>
          <Box flex={"1"}>
            <IconButton aria-label="Próximo anterior">
              <ChevronLeftIcon></ChevronLeftIcon>
            </IconButton>
            <IconButton aria-label="Próximo mês">
              <ChevronRightIcon></ChevronRightIcon>
            </IconButton>
          </Box>
          <Box component={"h3"} marginLeft={"16px"}>
            Junho de 2021
          </Box>

          <IconButton aria-label="Usuário">
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
          </IconButton>
        </Box>
        <Table
          sx={{ minHeight: "100%" }}
          aria-label="simple table"
          className="borda"
        >
          <TableHead>
            <TableRow>
              {DAYS_OF_WEEK.map((day) => (
                <TableCell align="center" className="borda">
                  {" "}
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {weeks.map((week, i) => (
              <TableRow key={i}>
                {week.map((cell) => (
                  <TableCell align="center" className="borda" key={cell.date}>
                    {" "}
                    {cell.date}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

interface ICalendarCell {
  date: string;
}
function generateCalendar(date: string): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(date + "T12:00:00");
  const currentMonth = jsDate.getMonth();

  const currentDay = new Date(jsDate.valueOf());
  currentDay.setDate(1);
  const dayOfWeek = currentDay.getDay();
  currentDay.setDate(1 - dayOfWeek);

  do {
    const week: ICalendarCell[] = [];
    for (let index = 0; index < DAYS_OF_WEEK.length; index++) {
      const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, "0");
      const dateStr = currentDay.getDate().toString().padStart(2, "0");
      const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dateStr}`;
      week.push({ date: isoDate });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);
  return weeks;
}

function getToday() {
  return "2021-06-17";
}
