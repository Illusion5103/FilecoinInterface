import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import './App.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Typography from '@mui/material/Typography';
import axios from 'axios';

class Main extends React.Component {
    constructor(props){
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.updatePage = this.updatePage.bind(this);
      this.state = {
        loading: false,
        value: '',
        dataReceived: false,
        data: '',
        flag: false,
      }
    }

    handleClick() {
      this.setState({loading: true});
      this.handleSubmit();
    }

    handleChange(event) {    
      this.setState({value: event.target.value});  
    }
    
    handleSubmit(event) {
        //alert('A CID was submitted: ' + this.state.value);
        event.preventDefault();
        this.getData();
    }

    updatePage(){
        setTimeout(() => {
            this.setState({loading: false, dataReceived: true});
        }, 1000);
    }
      
    async getData() {
        const url = 'https://' + this.state.value + '.ipfs.dweb.link';
        const res = await this.getIPFS(url);
        if (res === undefined) {
          return "Error! Please try again.";
        }
        this.updatePage();
        console.log(res.toString());
        this.setState({data: res.toString()});
      
    }
      
    async getIPFS(url) {
        try {
          const response = await axios.get(url);
    
          return response.data;
        } catch (err) {
          console.log(err);
        }
    }
    
    render() {

        if (this.state.dataReceived) {

            return (

                <div className="App">
                <form onSubmit={this.handleSubmit}>
                 <Box sx={{
                      display: 'flex',
                      width: '100%',
                      position: 'relative',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mt: 3
                  }}
                >

                        <br/>
                        <br/>
                  <TextField fullWidth label="Enter a CID" id="fullWidth" 
                  value={this.state.value}
                  onChange={this.handleChange}
                  size="small"
                  sx={{
                      width: '80vw',
                      maxWidth: 700
                  }}/>
      
                  <LoadingButton
                      size="large"
                      type="submit"
                      value="Submit"
                      onClick={this.handleClick}
                      loading={this.state.loading}
                      loadingPosition="center"
                      variant="contained"
                      sx={{
                          boxShadow: 'none'
                      }}>
                      <ArrowRightIcon />
                  </LoadingButton>
                </Box>
                </form>


                <Card sx={{
                    pt: 3,
                    pb: 3,
                    mt: 3,
                    mb: 82,
                }}>
                    <Typography color="primary" variant="h5" sx={{
                        fontWeight: 'bold'
                    }}>
                        Data:
                    </Typography>
                    <br/>
                    <Typography >
                        {this.state.data}
                    </Typography>
                    <br/>

                </Card>
            </div>
            )
        }

      return (
        <div className="App">

        <Box 
            sx={{
                height: '57vh',
                width: '100%',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
          {/* <Box
            sx={{
                display: 'flex',
                mt: '35vh',
                mb: '5vh',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',

            }}
          >

            <TextField fullWidth label="" id="fullWidth" 
                value={this.state.value}
                onChange={this.handleChange}
                size="small"
                sx={{
                    width: '80vw',
                    maxWidth: 700
            }}/>

            <LoadingButton
                size="large"
                type="submit"
                value="Submit"
                onClick={this.handleClick}
                loading={this.state.loading}
                loadingPosition="center"
                variant="contained"
                sx={{
                    boxShadow: 'none',
                }}>
                <ArrowRightIcon />
            </LoadingButton>

            </Box> */}

            <form onSubmit={this.handleSubmit}>
            <Box
                sx={{
                    display: 'flex',
                    mt: '35vh',
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >

            <TextField fullWidth label="Enter a CID to retrieve your data from the Filecoin network" id="fullWidth" 
            value={this.state.value}
            onChange={this.handleChange}
            size="small"
            sx={{
                width: '80vw',
                maxWidth: 700
            }}/>

            <LoadingButton
                size="large"
                type="submit"
                value="Submit"
                onClick={this.handleClick}
                loading={this.state.loading}
                loadingPosition="center"
                variant="contained"
                sx={{
                    boxShadow: 'none'
                }}>
                <ArrowRightIcon />
            </LoadingButton>

          </Box>
          </form>

          </Box>

        </div>
      );
    }
}

export default Main;