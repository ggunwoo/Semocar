import React, {useState} from 'react';
import { styled } from 'styled-components'
import { Box, Tabs, Tab, Typography } from '@mui/material';
import * as type from '../types/types'

export function TebView() {
  const [value, setValue] = useState(0)
  const [tabIndex, setTabIndex] = useState([0,1,2])
  const TabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={TabChange} aria-label="basic tabs example">
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {
          tabIndex.map((a, i)=>(
            <TabPanel key={tabIndex[i]} value={value} index={i}>
              <div>엥?</div>
            </TabPanel>
          ))
        }
      </Box>
    </>
  )
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function TabPanel(props: type.TabPanelProps) {
  const { children, value, index, ...other } = props;

  console.log('children '+children)
  // console.log('value '+value)
  // console.log('index '+index)
  // console.log('other '+other)

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}