// const Role = require("../models/Role");


// exports.generateRoadmap = async(targetRole, missingSkills = [], weakSkills = []) => {

//    const role = await Role.findOne({
//     name: new RegExp(`^${targetRole}$`, "i")
//   });

//   if (!role) {
//   throw new Error(`Role not found for: ${targetRole}`);
// }


// // console.log("TARGET ROLE:", targetRole);
//   let totalEstimatedDays = 0;

//   const roadmap = role.skills.map((skill) => {
//     let status = "Revise";
//     let priority = "Low";

//     let estimatedDays = 3; // base

//     const skillName = skill.name.toLowerCase();

//     const missing = missingSkills.map(s => s.toLowerCase());
//     const weak = weakSkills.map(s => s.toLowerCase());

//     if (missing.includes(skillName)) {
//       status = "Start Learning";
//       priority = "High";
//       estimatedDays += 3;
//     } else if (weak.includes(skillName)) {
//       status = "Improve";
//       priority = "Medium";
//       estimatedDays += 1;
//     }

//     totalEstimatedDays += estimatedDays;

//     return {
//        topic: skill.name,
//       level: skill.level,
//       status,
//       priority,
//       estimatedDays,
//       remainingDays: estimatedDays,
//       resources: [
//         {
//           title: `${skill.name} Tutorial`,
//           link: "https://www.youtube.com/results?search_query=" + skill.name
//         }
//       ]
//     };
//   });

//   return {
//     roadmap,
//     totalEstimatedDays
//   };
// };




const Role = require("../models/Role");

exports.generateRoadmap = async (targetRole, missingSkills = [], weakSkills = []) => {
  const role = await Role.findOne({
    name: new RegExp(`^${targetRole}$`, "i")
  });

  if (!role || !Array.isArray(role.skills)) {
    throw new Error(`Role not found or invalid skills for: ${targetRole}`);
  }

  const missingSet = new Set((missingSkills || []).map(s => s.toLowerCase()));
  const weakSet = new Set((weakSkills || []).map(s => s.toLowerCase()));

  let totalEstimatedDays = 0;

  const roadmap = role.skills.map((skill) => {
    const skillName = skill.name.toLowerCase();

    let status = "Revise";
    let priority = "Low";
    let estimatedDays = 3;

    if (missingSet.has(skillName)) {
      status = "Start Learning";
      priority = "High";
      estimatedDays += 3;
    } else if (weakSet.has(skillName)) {
      status = "Improve";
      priority = "Medium";
      estimatedDays += 1;
    }

    totalEstimatedDays += estimatedDays;

    return {
      topic: skill.name,
      level: skill.level,
      status,
      priority,
      estimatedDays,
      remainingDays: estimatedDays,
      resources: [
        {
          title: `${skill.name} Tutorial`,
          link: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill.name)}`
        }
      ]
    };
  });

  return {
    roadmap,
    totalEstimatedDays
  };
};