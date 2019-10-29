const reflex = ()=>{
    return {
      dispatcher: e =>
      {
        //Add some suffix to our packet before dispatching
        window.router = window.router ? window.router : {state: "yo"};
        e.origin = !window.router.state ? "alien_request" : window.router.state;
        e.hash = window.router.routes;
        //^^^^^ [alien_request] means that page is opened up using a url and not from inside our app.

        //Let's dispatch our packet
        for(var i=0; i < this.linkedlist.length; i++)
            {this.linkedlist[i](e);}

        //Let's listener for additional callbacks.
        var surfaceIndex = this.surfaceList.indexOf(e.id);
        if(surfaceIndex > -1){
          //remove it from list.
          //fetch its sticker.
          //Remove sticker from list too.
          //Dispatch Reflex
          this.surfaceList.splice(surfaceIndex, 1);
          var sticker = this.stickerList[surfaceIndex];
          //^v Reversed steps
          this.dispatch(sticker);
          this.stickerList.splice(surfaceIndex, 1);

        }


      },
      linkedlist :[],
      toggler : e =>
      {
        //UI this to toggle UI elements state
        if (e == null)
      		    e = window.event;

        var target = e.target != null ? e.target : e.srcElement;

        //Our Toogle Neurons.
        //Simple callbacks for state toggling
        for(var i=0; i<this.toggleNeurons.length; i++)
            this.toggleNeurons[i](target);
      },
      toggleNeurons:[],
      init : () =>{
        window.reflexes = this;
        //this.linkedlist = new Array();
        //this.toggleNeurons = new Array();
        //toggleNeurons initialization - Best for Non-target Hit Events
        window.addEventListener("click", this.toggler);
        window.addEventListener("touchstart", this.toggler);
        
        //Stream initialization - API for all window events
        for(let i = 0; i < this.stream_services.length; i++){
          var event = this.stream_services[i];
          window.addEventListener(event, this.stream_delta[event]);
        }
        
      },
      dispatch: e =>{
        if(typeof e == "string") e = {id : e};
        this.dispatcher(e);
      },
      subscribe: function(linkedlist, nameoflist){
        if(this.linkedlistlist.indexOf(nameoflist) > -1){
          //It means we already have list of similar name
          return 0;
        }else{
          //It means we don't have any list of similar name.
          //So add it to linkedlistlist & linkedlist
          this.linkedlist.push(linkedlist);
          this.linkedlistlist.push(nameoflist);
          return 1;
        }
      },
      addTogglers: function(toggleNeurons, nameofpackage){
        if(this.toggleNeuronsList.indexOf(nameofpackage) > -1){
          return 0;
        }else{
          //It means we can add this package to list...
          this.toggleNeurons.push(toggleNeurons);
          this.toggleNeuronsList.push(nameofpackage);
          return 1;
        }
      },
      linkedlistlist: [],
      toggleNeuronsList: [],
      stream_services: ["click"],
      stream_delta: {
        click : e =>{
          for(let i = 0; i < this.stream_records["click"].sensors.length; i++){
            var response = this.stream_records["click"].sensors[i](e.target, e);
          }
          // Response will be send to this database of callback and eventually will be looked for any attached callbacks.
          if(response){ this.dispatch(response); }
        }
        
      },
      stream_register: (sensor, event, sensor_name)=>{
        var serv_list = this.stream_services;
        var records = this.stream_records;
        var delta = this.stream_delta;
        //check if this event's service is active or not
        if(serv_list.indexOf(event) <= -1){
          //If not then 
          //- add it to list of services
          //- add it to stream_delta and stream_records
          //- And addListener to respective window event
          serv_list.push(event);
          delta[event] = function(e){
            for(let i = 0; i < this.stream_records[e.type].sensors.length; i++){
              var gas = this.stream_records[e.type].sensors[i](e.target, e);
            }
            if(gas){
              let fart = gas;
              this.dispatch(fart); 
            }
          }
          records[event] = {
            sensors: [],
            sensors_list: []
          }
          window.addEventListener(event, delta[event]);
        }
        
        //Check if we already have sensor with this name in stream_records of this event's sensor_list or not
        if(records[event].sensors_list.indexOf(sensor_name) <= -1){
          //If not then add it to records
          records[event].sensors.push(sensor);
          //And to the list as well.
          records[event].sensors_list.push(sensor_name);
        }
        else{return false;}
        
      },
      stream_records: {
        click: {
          sensors: [],
          sensors_list: []
        }
        
      },
      attachCallback: (surface, sticker)=>{
        //surface signifines initial reflex to whom we have to attach a listener
        //whereas sticker is representing the reflex which needs to be callbacked after surface being called.

        //Add surface & sticker to list.
        this.surfaceList.push(surface);
        this.stickerList.push(sticker);
      },
      surfaceList: [],
      stickerList: []
    }

}


export default reflex;