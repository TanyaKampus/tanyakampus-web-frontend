// // src/pages/HasilAkhir/components/CampusRecommendationCard.tsx

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import type { CampusRecommendation } from "../../../data/hasilAkhirData";

// interface CampusCardProps {
//   campus: CampusRecommendation;
// }

// const CampusRecommendationCard: React.FC<CampusCardProps> = ({ campus }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="relative w-[250px] h-[250px] m-6 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
//       onClick={() => navigate(`/tanya-kampus/${campus.id}`)}
//     >
//       {/* Background Image */}
//       <img
//         src={campus.imageUrl}
//         alt={campus.name}
//         className="w-full h-full object-cover"
//       />

//       {/* Overlay Gradient */}
//       <div
//         className="absolute inset-0"
//         style={{
//           backgroundImage:
//             "linear-gradient(to top, rgba(116, 208, 208, 0.8), transparent)",
//         }}
//       />

//       {/* Category / Tag (Seragam Putih) */}
//       <div className="absolute top-3 right-3 bg-white text-secondary-500 px-3 py-1 text-sm font-semibold rounded-lg z-10 shadow-sm">
//         {campus.tag}
//       </div>

//       {/* Bottom Content */}
//       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 z-10">
//         <p className="text-white font-semibold text-lg leading-tight">
//           {campus.name}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CampusRecommendationCard;
