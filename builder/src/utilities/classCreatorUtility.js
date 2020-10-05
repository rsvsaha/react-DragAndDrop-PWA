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


export const createClassFromConfigurations = (classObj,production=true) => {
    console.log(classObj);
    var comp = typeToClass[classObj.type]();
    
    const windowHeight =  window.innerHeight;
    const windowWidth = window.innerWidth;
    
    const XRatio = (windowWidth/1024);
    const YRatio = (windowHeight/576);
    
    const width = XRatio *classObj.width;
    const height = YRatio*classObj.height;

    const X =  XRatio * classObj.X;
    const Y =  YRatio * classObj.Y;

    comp.setProduction(production);
    comp.setDimensions(X,Y,width,height);
    comp.events=classObj.events;
    comp.inputVariable=classObj.inputVariable;
    comp.properties=classObj.properties;
    comp.id = classObj.id;
    return comp;

}