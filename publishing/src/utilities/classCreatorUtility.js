import { CompositeComponent } from '../components/compositeComponent';
import { TextComponent } from '../components/textComponent';
import { TextInputComponent } from '../components/textInputComponent';
import { ButtonComponent } from '../components/buttonComponent';
import { ImageComponent } from '../components/imageComponent';
import { MessageComponent } from '../components/messageComponent';

const typeToClass = {

    "ButtonComponent" : () => { return new ButtonComponent();},
    "CompositeComponent": () => {return new CompositeComponent();},
    "TextComponent":() => {return new TextComponent();},
    "TextInputComponent":() => {return new TextInputComponent()},
    "ImageComponent":()=>{return new ImageComponent();},
    "MessageComponent":() => {return new MessageComponent();}
}


export const createClassFromConfigurations = (classObj,production=true,windowWidth = window.innerWidth,
    windowHeight =  window.innerHeight) => {
    var comp = typeToClass[classObj.type]();
    
    if(production) {
        
    
        console.log(windowWidth);
        console.log(windowHeight);
        const XRatio = (windowWidth/1024);
        const YRatio = (windowHeight/576);
        
        const width = XRatio *classObj.width;
        const height = YRatio*classObj.height;

        const X =  XRatio * classObj.X;
        const Y =  YRatio * classObj.Y;

        console.log(X,Y,width,height);
        comp.setDimensions(X,Y,width,height);
        
    }else {
        comp.setDimensions(classObj.X,classObj.Y,classObj.width,classObj.height);
    }
        
    
    comp.setProduction(production);
    comp.events=classObj.events;
    comp.inputVariable=classObj.inputVariable;
    comp.properties=classObj.properties;
    comp.id = classObj.id;
    return comp;

}