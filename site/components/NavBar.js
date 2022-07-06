class NavBar extends React.Component 
{
    constructor(props) {
        super(props);

        this.state = {
          
        }
        /*this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    */
    }
    handleChange(event) {
       
    }
    
    async handleLoginSubmit(event) {
      
    }

    render() {
        return  <div className="sidebar">
          <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Navigation Bar</h3>
            <ul className="sidebarList">
              <li className="nav_bar_messages_page"><a href="../messages.html" data-toggle="tab" >Messages</a>
              </li>
              <li className="nav_bar_about_page"><a href="../about-us.html" data-toggle="tab" >About Us</a>
                </li>
                <li className="nav_bar_home_page"><a  href="../home-page.html" data-toggle="tab" >Home-Page</a>
              </li>
            </ul>
             </div>
        </div>
    </div>
    }
} 