import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Image from '../../components/navbar-logo/image';
import './sidebar.less'; 
import SourceDefinition from './../../pages/source-definition/SourceDefinition';

const SubMenu = Menu.SubMenu;

class NavigationBar extends React.Component {
  rootSubmenuKeys = ["sub1", "sub2", "sub3"];

  constructor(props) { 
    super(props);
    this.state = {
      openKeys: ["sub1"],
      projects: []
    };
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  componentDidMount() {
    // axios.get("http://10.11.14.80:8081/recon/product/getlist/")
    //     .then(res => {
    //                   const projects = res.data;
    //                   console.log(res.data);
    //                   this.setState({ projects });
    //                   }
    //     )

    fetch("http://10.11.14.79:8081/recon/product/getlist/")
    .then(res => res.json())
    .then(
      (result) => {
        console.log("Result::",result)
        this.setState({
            projects: result
          });
      },
      
      (error) => {
        console.log("Cannot fetch product list");
        console.log(error);
      }
    )
  } 

  render() {
    return (
      <Menu  theme="dark"  mode="inline"  openKeys={this.state.openKeys}  onOpenChange={this.onOpenChange}  defaultSelectedKeys={['Samson']}>

        <Image/>

        <SubMenu className="menus" key="sub1"  title={ <span> <Icon type="appstore" /> <span>Projects</span> </span> } >  
          {
            this.state.projects.map(project=>
              <Menu.Item key={project.productName}>{project.productName}</Menu.Item>
            )
          }
          {/* Preview as menu item with icon
          <Menu.Item><Icon type="pic-center"/>Preview</Menu.Item> */}
          {/* Normal menu item without icon */}
          <Menu.Item>Preview</Menu.Item>
          {/* Preview css self written class spa
          <div className="spa"><Icon type="pic-center" className = "icon"/>Preview</div> */}
        </SubMenu> 

        <SubMenu key="sub2"  title={ <span> <Icon type="appstore" /> <span>Recon</span> </span> } >
          {
            this.state.projects.map(project=>
              <Menu.Item>{project.productName}</Menu.Item>
            )
          }
        </SubMenu>
      
      </Menu>
      
    /*   <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Mgmt-Console</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="reconciliation" />
              <span>Dashboard</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="home" /><span>Workflow</span></span>}
            >             
              <Menu.Item key="3">Define Source</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file"/>
              <span>File</span>
            </Menu.Item>
            
          </Menu>
 */
    );
  }
}
export default NavigationBar;