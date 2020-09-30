import React, { ReactNode } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import { DockTop, DockRight, DockLeft, DockBottom } from './components/DockPanel';
import { List, Row, Col, Tag, Checkbox, Button} from 'antd';
import Search from 'antd/lib/input/Search';
import { DataSource} from './data-components/DataSource';
import { FullHeightDiv, FullHeightClass as FullHeightClassName } from './components/FullHeight';
import ReactResizeDetector from 'react-resize-detector';
import { CInputModal, InputModal } from './Modals/InputModal';
import { ModalResult } from './Modals/ModalResultEnum';

import {API, API_PORT} from "./commons/API"
import { DomainItem } from './commons/Classes/DomainItem';
import { FilterMenu, FilterMenuList, SimpleFunctionFilter } from './components/FilterMenu';
import { getJson } from './utils/fetchUtils';


import { DockPanel, Docks} from './ui-comp/Dock';

export interface AppState {
  myNumber : number
  
}


class App extends React.Component<{},AppState> {

  data : DataSource<DomainItem> = new DataSource<DomainItem>();
  inputModal1 : InputModal = new InputModal("Add domain", "domain", "example.com");

  mySearchFilter = new FilterMenuList(["Allowed Domains", "Include 4"]);
  mySearchDomainFilters = new SimpleFunctionFilter<DomainItem>([
    (item,included)=> {return !item.Blocked && included },
    (item,included)=> {return item.Name.indexOf('4') > -1 && included },
  ]);

  constructor(props : {}) {
    super(props);
    this.data.addSubscriber(()=>{this.setState(this.state)})
    this.data.applyFilter(
      (item)=> {
       return this.mySearchDomainFilters.filterItem(item, this.mySearchFilter.getAllStates(), true);
     }
   );
  }

  state: AppState = {
    myNumber: 0,    
  }

  updateNumber = (i: number) => {
    this.setState({ myNumber: i });
    this.data.addData(new DomainItem());
  }

  addDomainByDialog() {
     this.inputModal1.showDialog((dialogResult, Result)=>{
      if (dialogResult == ModalResult.OK)
        this.data.addData(new DomainItem(Result, false));
    }) 
  }

  async addDomain2() {
    let newDomain : DomainItem = await getJson<DomainItem>(`http://localhost:${API_PORT}${API.GET_DOMAIN}`, "new domain");
    this.data.addData(newDomain);
  }

  renderItem(item: DomainItem, index: number) : ReactNode {
    return (
      <List.Item actions={[(<a>Edit</a>), (<a>Edit</a>)]} >
        <List.Item.Meta
          title = {item.Name}
          description = {(
                <div><Checkbox disabled={item.Blocked}>Allowed</Checkbox><Tag>hello</Tag></div>
            )}
        />
      </List.Item>
    );
  }

  
  

  render2() {
    return (
      <div className="App" style={{ height: "100vh", width: "100vw" }}>
          <CInputModal manager={this.inputModal1}></CInputModal>
          <DockTop>
            <MainMenu updateFunc={this.updateNumber} ></MainMenu>
            <FullHeightDiv>
              <Row className={FullHeightClassName}>
                <Col span={8} className={FullHeightClassName}>
                  <FullHeightDiv style={{padding: "10px"}} >
                    <DockTop>
                        <DockRight wrapperStyle={{padding: "10px"}}>
                          <DockRight>
                            <DockLeft>
                            <Button type="primary" style={{marginLeft: "10px", marginRight: "10px"}}
                              onClick={async () => {await this.addDomain2()}}
                            >
                              +
                            </Button>
                            <FilterMenu FilterList={this.mySearchFilter} onFilterUpdated={()=>{this.data.reApplyFilters()}} />
                            </DockLeft>
                          <Search 
                          placeholder="search domain" 
                          /*onSearch={value => this.data.applyFilter(this.getFilterFunc(value))} 
                           enterButton  */
                          />
                          </DockRight>
                        </DockRight>
                        <DockBottom>
                          <div style={{minHeight: "50px"}}>
                              Im alone
                          </div>
                          <ReactResizeDetector handleHeight render={({height}) => {return (
                            <FullHeightDiv>
                            <div style={{ height: height, 
                              overflowY:  "auto", padding: "0 10px",
                              }} >
                                  <List dataSource={this.data.filteredData} renderItem={this.renderItem} ></List>
                              </div>
                            </FullHeightDiv>
                          )}} />
                          
                        </DockBottom>
                    </DockTop>
                  </FullHeightDiv>
                </Col>
                <Col span={8} className={FullHeightClassName}><b>col-8</b></Col>
                <Col span={8} className={FullHeightClassName}><b>col-8</b></Col>
              </Row>
            </FullHeightDiv>
          </DockTop>
      </div>
    );
  }


  render() {
    return (
      <div>

      <DockPanel>
        <div {...Docks.TOP} style={{backgroundColor:"lightsalmon"}} key="2" >Top</div>
        <div {...Docks.LEFT} style={{backgroundColor:"rgb(255, 253, 122)"}} key="4">Left </div>
        <div {...Docks.RIGHT} style={{backgroundColor:"rgb(122, 213, 255)"}} key="6">Right</div>
        <div {...Docks.BOTTOM} style={{backgroundColor:"rgb(255, 122, 140)"}} key="8">Bottom</div>
        <div  
          style={{backgroundColor:"lightblue",border:"solid black 1px", width:"100%"}} key="9">Fill</div>
      </DockPanel>

      <br />


      <DockPanel>
        <div {...Docks.LEFT} style={{backgroundColor:"lightsalmon"}} key="2" >1</div>
        <div {...Docks.LEFT} style={{backgroundColor:"rgb(255, 253, 122)"}} key="4">2 </div>
        <div {...Docks.RIGHT} style={{backgroundColor:"rgb(122, 213, 255)"}} key="6">3</div>
        <div {...Docks.BOTTOM} style={{backgroundColor:"rgb(255, 122, 140)"}} key="8">4</div>
        <div 
          style={{backgroundColor:"lightblue",border:"solid black 1px", width:"100%"}} key="9">5</div>
      </DockPanel>

      <br />


      <div style={{height: "100px", maxHeight:"100px"}}> 
        <DockPanel>
          <div {...Docks.TOP} style={{backgroundColor:"lightsalmon"}} key="2" >Top</div>
          <div {...Docks.LEFT} style={{backgroundColor:"rgb(255, 253, 122)"}} key="4">Left </div>
          <div {...Docks.RIGHT} style={{backgroundColor:"rgb(122, 213, 255)"}} key="6">Right</div>
          <div {...Docks.BOTTOM} style={{backgroundColor:"rgb(255, 122, 140)"}} key="8">Bottom</div>
          <div  id="fill"
            style={{backgroundColor:"lightblue",border:"solid black 1px",
             height: "100%", "maxHeight":"100%", minHeight: 0, overflow:"auto"}} key="9">
               Fill
              </div>
        </DockPanel>
      </div>

      <br />

      <div style={{height: "300px", maxHeight:"300px"}}> 
        <DockPanel>
          <div {...Docks.TOP} style={{backgroundColor:"lightsalmon"}} key="2" >Top</div>
          <div {...Docks.LEFT} style={{backgroundColor:"rgb(255, 253, 122)"}} key="4">Left </div>
          <div {...Docks.RIGHT} style={{backgroundColor:"rgb(122, 213, 255)"}} key="6">Right</div>
          <div {...Docks.BOTTOM} style={{backgroundColor:"rgb(255, 122, 140)"}} key="8">Bottom</div>
          <div  id="fill"
            style={{backgroundColor:"lightblue",border:"solid black 1px",
             height: "100%", "maxHeight":"100%", minHeight: 0, overflow:"auto"}} key="9">
               <DockPanel>
                <div {...Docks.TOP} style={{backgroundColor:"lightsalmon"}} key="2" >Top</div>
                <div {...Docks.LEFT} style={{backgroundColor:"rgb(255, 253, 122)"}} key="4">Left </div>
                <div {...Docks.RIGHT} style={{backgroundColor:"rgb(122, 213, 255)"}} key="6">Right</div>
                <div {...Docks.BOTTOM} style={{backgroundColor:"rgb(255, 122, 140)"}} key="8">Bottom</div>
                <div  id="fill2"
                  style={{backgroundColor:"lightblue",border:"solid black 1px",
                  height: "100%", overflow:"auto"}} key="9">
                    Fill
                </div>
              </DockPanel>
          </div>
        </DockPanel>
      </div>

      <br />

      <div style={{height: "300px", maxHeight:"300px"}}> 
        <DockPanel>
          <div {...Docks.TOP} style={{backgroundColor:"lightsalmon"}} key="2" >Top</div>
          <div {...Docks.TOP} style={{backgroundColor:"rgb(255, 253, 122)"}} key="4">Left </div>
          <div {...Docks.TOP} style={{backgroundColor:"rgb(122, 213, 255)"}} key="6">Right</div>
          <div {...Docks.TOP} style={{backgroundColor:"rgb(255, 122, 140)"}} key="8">Bottom</div>
          <div  id="fill"
            style={{backgroundColor:"lightblue",border:"solid black 1px",
             height: "100%", "maxHeight":"100%", minHeight: 0, overflow:"auto"}} key="9">
               <DockPanel>
                <div {...Docks.TOP} style={{backgroundColor:"lightsalmon"}} key="2" >Top</div>
                <div {...Docks.LEFT} style={{backgroundColor:"rgb(255, 253, 122)"}} key="4">Left </div>
                <div {...Docks.RIGHT} style={{backgroundColor:"rgb(122, 213, 255)"}} key="6">Right</div>
                <div {...Docks.BOTTOM} style={{backgroundColor:"rgb(255, 122, 140)"}} key="8">Bottom</div>
                <div  id="fill3"
                  style={{backgroundColor:"lightblue",border:"solid black 1px",
                  height: "100%", overflow:"auto"}} key="9">
                    Fill
                </div>
              </DockPanel>
          </div>
        </DockPanel>
      </div>

      </div>
    )
  }
}

export default App;
