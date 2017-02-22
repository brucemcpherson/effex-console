import React from "react";
import XCard from "../XCard";

export default class extends React.Component {
  render() {
    
    let Articles = [{ 
            title:"The Effex API",
            subtitle:"what it's for",
            content:<span>A simple way of exchanging ephemeral data 
            between platforms that dont easily talk to each other. 
            Anything that can make a JSON HTTP request can use the 
            exchange to talk to any other. This is a hosted
            solution so you don't need a server.</span>
        },
        { 
            title:"Accounts",
            subtitle:"multiple accounts",
            content:<span>A registered user can have multiple accounts. 
            Keys and items are specific to an account. 
            A key associated with one account will not work with items
            belonging to another</span>
        },
        { 
            title:"Controlling access",
            subtitle:"keys",
            content:<span>The most complicated things about exchanging data is often authentication.
            Effex doesn't require authentication, as access is managed through access keys. Every key has a
            an expiration period, assigned when created, and can be used to access multiple items in an account.
            A key can only access an item for which it has been given explicit permission to access, and roles
            are assigned to keys which describe what it can do to that item.
            Normally both the item key and access key are needed to access an item, but a key can be optionally be given 
            a scan power, which allows it to search for all the items it has been authorized to look at.
            </span>
        },

        { 
            title:"Access items",
            subtitle:"with the item key",
            content:<span>Data items are written to the exchange, 
            and can be referenced by a unique key. 
            All data items are designed to be ephemeral and to 
            expire after a given time, just like access keys.</span>
        },{ 
            title:"Create keys",
            subtitle:"with the boss key",
            content:<span>Each account has one or more boss keys.  
            These are used to generate temporary access keys which can then be shared
            with collaborators or used privately by the account owner</span>
        },{ 
            title:"Create items",
            subtitle:"with a writer key",
            content:<span>A writer key allows you to create, 
            read or update data items for a partcular account. As with all keys, 
            they can be set to expire after a given period.</span>
        },{ 
            title:"Read items",
            subtitle:"with a reader key",
            content:<span>A reader key allows you to 
            read data items for a partcular account. 
            To read an item, the collaborator must know the item key,
            and hold a reader key that has been authorized to access that item. If a reader key 
            has been given the scan power, it can be used to identify 
            all the items it has the permission to read</span>
        },{ 
            title:"Update items",
            subtitle:"with an update key",
            content:<span>An update key allows you to read 
            or update data items for a partcular account. 
            The collaborator must know the item key, and hold an update key that has been authorized 
            to access that item. If an update key 
            has been given the scan power, it can be used to identify 
            all the items it has the permission to read or update</span>
        },{ 
            title:"Locking",
            subtitle:"further securing keys",
            content:<span>Keys have expiration and account 
            information built into them. 
            A key can also be locked, meaning that the collaborator needs to know an 
            unlock pass phrase as well as an item key and an access key to be allowed to access a data item. 
            If you use a lock code it is not stored anywhere so cannot be retrieved. A locked key is only usuable
            with the passphrase it was locked with.</span>
        },{ 
            title:"Security",
            subtitle:"protecting the data",
            content:<span>There is no authentication required to the exchange. 
            A collaborator just needs to know the item key and an access key 
            authorized for that data item. 
            Keys and data are encrypted while 
            held in the exchange store, and will expire after a given time.
            To comply with your local countries laws, 
            no personally identifiable data should be stored in the exchange</span>
        },{
            title:"Personal encryption",
            subtitle:"further protection",
            content:<span>
            You can further protect your data by applying your own secret key to 
            the data. This will encrypt the data at source prior to transmission
            and decrypt when reading when provided with the encryption secret. Like
            the access key lock passphrase, the personal encryption key is not stored
            or even passed to the server, and your data will be unreadable without it.
            </span>
        },
        { 
            title:"Dashboard",
            subtitle:"tracking usage",
            content:<span>A dashboard is available for 
            each user that shows all accesses ever made for all data items by which keys</span>
        },
        { 
            title:"Registration",
            subtitle:"data stored",
            content:<span>
            You can register with your Google or Github persona. No Email addresses,
            passwords 
            or other identifiable info are stored in the exchange</span>
        },
        { 
            title:"Plans",
            subtitle:"subscription types",
            content:<span>This service is in developer 
            preview for now. The only plan available is a free tier, which offers rate limited access. In the 
            future multiple accounts will be able to have different plans assigned</span>
        }
    ].map((d, i) => 
        <XCard title={d.title} key={i} subtitle={d.subtitle} initiallyExpanded={false} content={d.content} />
    );


    return (
        <div style = {{padding:16}}>
            <div style={{width:this.props.contentWidth, paddingLeft:this.props.contentLeft}}>
                <div>
                    <h2>The Effex API introduces a number of terms such as access keys and so on. You can get
                    a quick introduction to how it all works here</h2>
                    {Articles}
                </div>
            </div>
        </div>
    );
  }
}
