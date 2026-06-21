import googleImg from "../../assets/imgs/google.png";
import appleImg from "../../assets/imgs/apple.png";
import facebookImg from "../../assets/imgs/facebook.png";

export interface SocialMedia {
  id: number;
  img: string;
  text: string;
  alt: string;
}

export const socialMedias: SocialMedia[] = [
  { 
    id: 1, 
    img: googleImg,   
    text: "Google",   
    alt: "Google logo"   
  },
  { 
    id: 2, 
    img: appleImg,    
    text: "Apple",    
    alt: "Apple logo"    
  },
  { 
    id: 3, 
    img: facebookImg, 
    text: "Facebook", 
    alt: "Facebook logo" 
  },
];
