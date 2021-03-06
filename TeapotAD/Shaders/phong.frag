#version 430


in vec3 vertPos;   //P
in vec3 N;                   //surface normal at p
in vec3 lightPos;
/*TODO:: Complete your shader code for a full Phong shading*/ 

uniform vec3 Kd;            // Diffuse reflectivity
uniform vec3 Ld;            // Diffuse light intensity

uniform vec3 La;
uniform vec3 Ka;

uniform vec3 Ks;    //specular reflection coefficient
    
uniform vec3 Ls;     //light intensity


in mat4 V;
in vec3 cameraPosition;
vec3 playerVision = cameraPosition - vertPos;



//LA, KA, LD, KO, KS, LS


// complete to a full phong shading
layout( location = 0 ) out vec4 FragColour;

void main() {

   //Calculate the light vector
   vec3 L = normalize(lightPos - vertPos);  //What is this code doing?
     
   
   //calculate Diffuse Light Intensity making sure it is not negative and is clamped 0 to 1  
   vec4 Id = vec4(Ld,1.0) * max(dot(N,L), 0.0);// Why do we need vec4(vec3)?
   Id = clamp(Id, 0.0, 1.0); // What is the role of clamp function? Why do we need it? 

   vec4 Id2 = vec4(La, 1.0);
   Id2 = clamp(Id2, 0.0, 1.0);

   vec4 Id3 = vec4(Ls, 1.0);
   Id3 = clamp(Id3, 0.0, 1.0);
  
   vec3 R = reflect(-L, N);   //lightPos, vertPos,   (reflection)

   
   float newP = dot(normalize(R), normalize(playerVision));


   ////////////////////////////////////Lighting stuff//////////////////////////////////////

   //FragColour = vec4(Kd,1.0) * Id;						//Diffuse

   //FragColour = Id2 * vec4(Ka, 1.0);						//Ambient

   //FragColour = vec4(Ks,1.0) * Id3 * pow(newP, 10) ;        //specular


   //////////////////////////////////////////////////////////////////////////

   
   FragColour = (vec4(Kd,1.0) * Id) + (Id2 * vec4(Ka, 1.0)) + (vec4(Ks,1.0) * Id3 * pow(newP, 1));

   
}


//Ambient = LA * KA
	//Diffus = LD * KO * COS()
	//Secular = KS*LS*COS (power n) () ---------- Ks * Ls * cos n (p)
	//P = ANGLE between V and R (Use lab sheet)