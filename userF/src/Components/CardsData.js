import L_Handle_set from "../img/L_Handle_set.png";
import Fat_Grip_For_Cupping from "../img/Fat_Grip_For_Cupping.png";
import Cone_Grip from "../img/Cone_Grip.png";
import Wrist_Wrench from "../img/Wrist_Wrench.png";
import Cupping_Handle from "../img/Cupping_Handle.png";
import Multi_Spinner from "../img/Multi_Spinner.png";
import TRINGA_ECCENTRIC_SET from "../img/TRINGA_ECCENTRIC_SET.png";
import Palm_Cupping_L_Handle from "../img/Palm_Cupping_L_Handle.png";
import Loading_Pin from "../img/Loading_Pin.png";
import Hand_Winder from "../img/Hand_Winder.png";
import Tiranga_Eccentric_Grip from "../img/Tiranga_Eccentric_Grip.png";
import Elliptical_Wrist_Ball from "../img/Elliptical_Wrist_Ball.png";
import Premium_Table_Strap from "../img/Premium_Table_Strap.png";
import Eccentric_Grip from "../img/Eccentric_Grip.png";
import Professional_Wrist_Ball from "../img/Professional_Wrist_Ball.png";
import Devon_Larrat_Cupping_Handles from "../img/Devon_Larrat_Cupping_Handles.png";
import Pronation_Ring_with_Hook from "../img/Pronation_Ring_with_Hook.png";
import Arm_Wrestling_Training_Strap from "../img/Arm_Wrestling_Training_Strap.png";
import Stainless_Steel_15mm_C_Handle from "../img/Stainless_Steel_15mm_C_Handle.png";
import Arm_Wrestling_Handles_Set from "../img/Arm_Wrestling_Handles_Set.png";
import Claws_Arm_Wrestling_Table from "../img/Claws_Arm_Wrestling_Table.png";
import Arm_Wrestling_Table_Pulley from "../img/Arm_Wrestling_Table_Pulley.png";
import Professional_Training_Strap from "../img/Professional_Training_Strap.png";
import Claws_Cotton_Denis_T_Shirt_Black from "../img/Claws_Cotton_Denis_T-Shirt_Black.png";
import product1 from "../img/product-1.JPG";
const apiUrl = process.env.REACT_APP_API_URL;

const Cardsdata = [
    {
        id: 1,
        rname: "L Handle Set",
        imgdata: L_Handle_set,
        somedata: "L Grip, AP Cone Grip 70mm, Fat Grip 50mm, Normal Grip 30mm, C Handle",
        price: 4499,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 2,
        rname: "Fat Grip For Cupping",
        imgdata: Fat_Grip_For_Cupping,
        somedata: "50mm Fat Grip for Cupping Fits with Wristball,net Handle",
        price: 599,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 3,
        rname: "Cone Grip",
        imgdata: Cone_Grip,
        somedata: "70mm Cone Grip, Best for Hook, Top Roll Training",
        price: 599,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 4,
        rname: "Wrist Wrench",
        imgdata: Wrist_Wrench,
        somedata: "High Pressure, PVC Pipe, 2 inch Diameter",
        price: 699,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 5,
        rname: "Cupping Handle",
        imgdata: Cupping_Handle,
        somedata: "High Pressure, PVC Pipe, 2.5 inch diameter",
        price: 699,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 6,
        rname: "Multi Spinner",
        imgdata: Multi_Spinner,
        somedata: "High Pressure, PVC Pipe, 2.5 inch diameter",
        price: 399,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 7,
        rname: "Tiranga Eccentric Set",
        imgdata: TRINGA_ECCENTRIC_SET,
        somedata: "Eccentric Grip 70mm, Cone 70mm, Fat Grip 50mm, Simple Grip 32mm",
        price: 4499,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 8,
        rname: "Palm Cupping L Handle",
        imgdata: Palm_Cupping_L_Handle,
        somedata: "L Handle for Palm Cupping, Best In Industry",
        price: 1499,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 9,
        rname: "Loading Pin",
        imgdata: Loading_Pin,
        somedata: "Equipment used for lifting weights in a symmetry, maximum load capacity - 200kg",
        price: 499,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 10,
        rname: "Hand Winder",
        imgdata: Hand_Winder,
        somedata: "Best for gripping strength, for pronation and supination",
        price: 1999,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 11,
        rname: "Tiranga Eccentric Grip",
        imgdata: Tiranga_Eccentric_Grip,
        somedata: "70mm Eccentric Grip, Best for finger training",
        price: 2499,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 12,
        rname: "Elliptical Wrist Ball",
        imgdata: Elliptical_Wrist_Ball,
        somedata: "Elliptic wrist ball for supination, pronation and raising training",
        price: 599,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 13,
        rname: "Premium Table Strap",
        imgdata: Premium_Table_Strap,
        somedata: "Very thick, smooth and fine quality strap",
        price: 199,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 14,
        rname: "Eccentric Grip",
        imgdata: Eccentric_Grip,
        somedata: "70mm Eccentric Grip, Best for finger training",
        price: 1799,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 15,
        rname: "Professional Wrist Ball",
        imgdata: Professional_Wrist_Ball,
        somedata: "65mm Size and 80kg Capacity, Professional wrist ball for supination, pronation and raising training",
        price: 499,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 16,
        rname: "Devon Larrat Cupping Handles",
        imgdata: Devon_Larrat_Cupping_Handles,
        somedata: "Devon Larrat Cupping Handles, Set of 3- Wrist Wrench, Multi Spinner , Cupping Handle",
        price: 1499,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 17,
        rname: "Pronation Ring with Hook",
        imgdata: Pronation_Ring_with_Hook,
        somedata: "Thick Chain, Heavy Duty Pronation, Ring Max Load 200kg",
        price: 999,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 18,
        rname: "Arm Wrestling Training Strap",
        imgdata: Arm_Wrestling_Training_Strap,
        somedata: "Fine and Thick Quality, Strap for Light Weight Exercise and Recovery, Maximum Load- 70kg",
        price: 199,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 19,
        rname: "Stainless Steel 15mm C Handle",
        imgdata: Stainless_Steel_15mm_C_Handle,
        somedata: "Fits With all Products of Wristball,net",
        price: 1499,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 20,
        rname: "Arm Wrestling Handles Set",
        imgdata: Arm_Wrestling_Handles_Set,
        somedata: "70mm Cone Grip, 50mm Fat Grip, 70mm Eccentric Grip, 30mm Normal Grip, C Handle",
        price: 4499,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 21,
        rname: "Claws Arm Wrestling Table",
        imgdata: Claws_Arm_Wrestling_Table,
        somedata: "ARMBET Style Portable, Arm Wrestling Table Can be assembled and carried in any car, easily transportable",
        price: 11999,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 22,
        rname: "Arm Wrestling Table Pulley(Detachable)",
        imgdata: Arm_Wrestling_Table_Pulley,
        somedata: "Fits on any Arm, Wrestling Table",
        price: 1999,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 23,
        rname: "Professional Training Strap",
        imgdata: Professional_Training_Strap,
        somedata: "2 inch wide, very thick and fine quality training strap, maximum loading capacity is 150kg",
        price: 299,
        rating: "3.8",
        qnty:0,
        category:"Equipment",
    },
    {
        id: 24,
        rname: "Claws Cotton Denis T-Shirt Black",
        imgdata: Claws_Cotton_Denis_T_Shirt_Black,
        somedata: "Cotton Black Coloured, Denis Printed T-Shirt, for Arm Wrestler Lovers",
        price: 899,
        rating: "3.8",
        qnty:0,
        category:"Merchandise",
    },
    {
        id: 25,
        rname: "Claws Cotton T-Shirt Black",
        imgdata: product1,
        somedata: "Cotton Black, Coloured Claws Logo Printed, T-Shirt for Arm Wrestler Lovers",
        price: 499,
        rating: "3.8",
        qnty:0,
        category:"Merchandise",
    },


];

export default Cardsdata;