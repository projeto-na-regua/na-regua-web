import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { toast } from "react-toastify";
import api from '../../api.js';

dayjs.locale('pt-br');

const newTheme = createTheme({
    components: {
        MuiDateCalendar: {
            styleOverrides: {
              root: {
                color: '#f4f3ee',
                backgroundColor: '#082031',
              }
            }
          },
          MuiPickersCalendarHeader: {
            styleOverrides: {
              root: {
                color: '#082031',
                borderRadius: '15px',
                backgroundColor: '#f4f3ee',
              },
              switchViewIcon: {
                color: '#082031',
              }
            }
          },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    backgroundColor: '#082031',
                    color: '#F4F3EE',
                    '&:hover': {
                        backgroundColor: '#2196f3',
                    },
                },
                today: {
                    backgroundColor: '#082031',
                    border: "1px solid #f4f3ee !important"
                }
            }
        },
        MuiDayCalendar: {
            styleOverrides: {
              weekDayLabel: {
                color: '#f4f3ee',
                backgroundColor: '#082031',
              }
            }
          }
    }
});

export default function AgendaFullCalendar({handleDateChange}) {
    const [selectedDate, setSelectedDate] = useState(dayjs());


    const handleChange = (date) => {
      setSelectedDate(date);
      handleDateChange(date); // Chama a função recebida por propriedade para atualizar a data no componente pai
  };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={newTheme}>
                <DemoContainer components={['StaticDatePicker']}>
                    <DemoItem>
                        <StaticDatePicker
                            value={selectedDate}
                            onChange={handleDateChange}
                            componentsProps={{
                                textField: { variant: "standard" }
                            }}
                            displayStaticWrapperAs="desktop"
                            showToolbar={false}
                            disablePast
                        />
                    </DemoItem>
                </DemoContainer>
            </ThemeProvider>
        </LocalizationProvider>
    );
}
