pragma solidity ^0.4.26;

contract trust {
   struct User{
       int trust_score;
       int wrong_attempts;
   }
   mapping (address => User ) users;

   mapping (string => bool ) endorsements;

   mapping (string => bool ) friendlist;

   address[] public useraccts;
   
   
   
   function strConcat(address a, address b) internal pure returns (string){
       return string(abi.encodePacked(a, b));
    }
   
   function addfriend(address user1, address user2 ) public{
       
       string memory id = strConcat(user1,user2);
       friendlist[id]=true;
   }
    
   function setuser( address _address) public{
     var user= users[_address];
     user.trust_score=0;
     user.wrong_attempts=0;
     useraccts.push(_address) -1;
   }
   function isfriend(address add1,address add2) public view returns (bool){
       string memory _id = strConcat(add1,add2);
       if(friendlist[_id]){
           return true;
       }
       else{
           return false;
       }
   }

   function updatetrust( address sender, address reciever) public{
       var s=users[sender];
       var r=users[reciever];
       if(isfriend(sender,reciever)){
           s.trust_score=s.trust_score+ 2 ;
           r.trust_score=r.trust_score+ 4 ;

       }
       else{
           s.trust_score=s.trust_score+ 4 ;
           r.trust_score=r.trust_score+ 6 ;
       }
   }

   function endorse( address send,address rec){
       
       string memory _id1= strConcat(send,rec);
       if(endorsements[_id1]){
           var s_user= users[send];
           
           s_user.wrong_attempts=s_user.wrong_attempts+1;
           
           if(s_user.wrong_attempts>=5){
               s_user.trust_score=s_user.trust_score-1;
           }
       }
       else{
           endorsements[_id1]=true;
           updatetrust(send,rec);
       }
   }
   
      function getuser() public view returns (address[]) {
       return useraccts;
   }

   function gethighesttrust() public view returns (address){
       int max_trust=0;
       address hightrust=useraccts[0];

       for(uint i=0; i<useraccts.length;i++){
           var x=users[useraccts[i]];
           if(x.trust_score>max_trust){
               max_trust=x.trust_score;
               hightrust=useraccts[i];
           }
       }

       return hightrust;
   }
}