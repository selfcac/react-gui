import React, { ReactNode } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import { DockTop, DockRight, DockLeft } from './components/DockPanel';
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
    let newDomain : DomainItem = await (await fetch(`http://localhost:${API_PORT}${API.GET_DOMAIN}`)).json() as DomainItem;
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
  

  render() {
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
                        <ReactResizeDetector handleHeight render={({height}) => {return (
                          <FullHeightDiv>
                          <div style={{ height: height, 
                          overflowY:  "auto", padding: "0 10px",
                          }} >
                              <List dataSource={this.data.filteredData} renderItem={this.renderItem} ></List>
                          </div>
                        </FullHeightDiv>
                        )}} />
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
}

export default App;
