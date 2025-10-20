// import { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../utils/constants";

// export const GitHubStatsCard = ({
//   CardComponent,
//   variants,
//   padding = "p-6",
//   username,
//   hasLeetCode = true,
// }) => {
//   const [languages, setLanguages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   useEffect(() => {
//     const fetchLanguages = async () => {
//       if (!username) return;

//       try {
//         const response = await axios.get(
//           `${BASE_URL}/github-languages/${username}`
//         );
//         setLanguages(response.data.slice(0, 8));
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching languages:", error);
//         setLoading(false);
//       }
//     };

//     fetchLanguages();
//   }, [username, hasLeetCode]);

//   const maxCount = languages.length > 0 ? languages[0].count : 1;

//   const colors = [
//     "#3178c6",
//     "#d4bf19",
//     "#e34c26",
//     "#563d7c",
//     "#5ebf1f",
//     "#cc6699",
//     "#4F5D95",
//     "#b07219",
//     "#178600",
//     "#00ADD8",
//   ];

//   return (
//     <CardComponent
//       padding={padding}
//       className="md:col-span-1 lg:col-span-2 group bg-gradient-to-br from-neutral-900 to-neutral-900"
//       variants={variants}
//     >
//       <h2 className="text-sm text-white mb-2">Top Languages</h2>

//       {/* Language Bar Chart - Horizontal */}
//       <div className={`space-y-2 ${!hasLeetCode ? "py-1" : ""}`}>
//         {loading ? (
//           <div className="text-neutral-500 text-sm text-center py-4">
//             Loading...
//           </div>
//         ) : languages.length === 0 ? (
//           <div className="text-neutral-500 text-sm text-center py-4">
//             No languages found
//           </div>
//         ) : (
//           languages.map((lang, idx) => {
//             const barWidth = (lang.count / maxCount) * 100;
//             const isHovered = hoveredIndex === idx;

//             return (
//               <div
//                 key={lang.name}
//                 className={`relative ${!hasLeetCode ? "py-2" : ""}`}
//                 onMouseEnter={() => setHoveredIndex(idx)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//               >
//                 {/* Bar background */}
//                 <div
//                   className={`w-full bg-neutral-800 rounded-full overflow-hidden cursor-pointer ${
//                     !hasLeetCode ? "h-[3px]" : "h-[2px]"
//                   }`}
//                 >
//                   <div
//                     style={{
//                       width: `${barWidth}%`,
//                       backgroundColor: colors[idx % colors.length],
//                       height: isHovered
//                         ? hasLeetCode
//                           ? "4px"
//                           : "5px"
//                         : hasLeetCode
//                         ? "2px"
//                         : "3px",
//                       transition: "all 0.3s ease",
//                     }}
//                     className="rounded-full"
//                   />
//                 </div>

//                 {/* Tooltip on hover */}
//                 {isHovered && (
//                   <div
//                     className="absolute left-0 -top-10 px-2 py-1.5 rounded-md text-xs whitespace-nowrap shadow-lg z-10"
//                     style={{
//                       backgroundColor: colors[idx % colors.length],
//                       color: "#fff",
//                     }}
//                   >
//                     <div className="font-semibold">{lang.name}</div>
//                     <div className="text-[10px] opacity-90">
//                       {lang.count} {lang.count === 1 ? "repo" : "repos"}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>
//     </CardComponent>
//   );
// };

import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const GitHubStatsCard = ({
  CardComponent,
  variants,
  padding = "p-6",
  username,
  hasLeetCode = true,
}) => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      if (!username) return;

      try {
        const response = await axios.get(
          `${BASE_URL}/github-languages/${username}`
        );
        setLanguages(response.data.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching languages:", error);
        setLoading(false);
      }
    };

    fetchLanguages();
  }, [username, hasLeetCode]);

  const maxCount = languages.length > 0 ? languages[0].count : 1;

  const colors = [
    "#3178c6",
    "#d4bf19",
    "#e34c26",
    "#563d7c",
    "#5ebf1f",
    "#cc6699",
    "#4F5D95",
    "#b07219",
    "#178600",
    "#00ADD8",
  ];

  return (
    <CardComponent
      padding={padding}
      className="md:col-span-1 lg:col-span-2 group bg-gradient-to-br from-neutral-900 to-neutral-900"
      variants={variants}
    >
      <h2 className="text-sm text-white mb-2">Top Languages</h2>

      {/* Language Bar Chart */}
      <div className={`space-y-2 ${!hasLeetCode ? "py-1 space-y-3" : ""}`}>
        {loading ? (
          <div className="text-neutral-500 text-sm text-center py-4">
            Loading...
          </div>
        ) : languages.length === 0 ? (
          <div className="text-neutral-500 text-sm text-center py-4">
            No languages found
          </div>
        ) : (
          languages.map((lang, idx) => {
            const barWidth = (lang.count / maxCount) * 100;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={lang.name}
                className={`relative ${!hasLeetCode ? "py-1" : ""}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Language Label (only when no LeetCode) */}
                {!hasLeetCode && (
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-neutral-300 font-medium text-xs">
                      {lang.name}
                    </span>
                    {isHovered && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full animate-pulse"
                        style={{
                          backgroundColor: `${colors[idx % colors.length]}20`,
                          color: colors[idx % colors.length],
                        }}
                      >
                        {lang.count} {lang.count === 1 ? "repo" : "repos"}
                      </span>
                    )}
                  </div>
                )}

                {/* Bar background */}
                <div
                  className={`w-full bg-neutral-800 rounded-full overflow-hidden cursor-pointer ${
                    !hasLeetCode ? "h-2" : "h-[2px]"
                  }`}
                >
                  <div
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: colors[idx % colors.length],
                      height: isHovered
                        ? hasLeetCode
                          ? "4px"
                          : "100%"
                        : hasLeetCode
                        ? "2px"
                        : "100%",
                      transition: "all 0.3s ease",
                      boxShadow: isHovered
                        ? `0 0 10px ${colors[idx % colors.length]}80`
                        : "none",
                    }}
                    className="rounded-full"
                  />
                </div>

                {/* Tooltip on hover (only when LeetCode is present) */}
                {isHovered && hasLeetCode && (
                  <div
                    className="absolute left-0 -top-10 px-2 py-1.5 rounded-md text-xs whitespace-nowrap shadow-lg z-10"
                    style={{
                      backgroundColor: colors[idx % colors.length],
                      color: "#fff",
                    }}
                  >
                    <div className="font-semibold">{lang.name}</div>
                    <div className="text-[10px] opacity-90">
                      {lang.count} {lang.count === 1 ? "repo" : "repos"}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </CardComponent>
  );
};
