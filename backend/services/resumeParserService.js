exports.extractEducation = (text) => {
    const lower = text.toLowerCase();

    const startIndex = lower.indexOf("education");
    if (startIndex === -1) return [];

    const after = text.slice(startIndex);

    const endMatch = after.match(/(skills|projects|experience)/i);

    let section = after;
    if (endMatch) {
        section = after.slice(0, endMatch.index);
    }

    const lines = section.split("\n").map(l => l.trim());

    return lines
        .filter(l => l.length > 10)
        .slice(1, 3)
        .map(line => ({
            college: line,
            degree: "",
            year: ""
        }));
};

exports.extractProjects = (text) => {
    if (!text) return [];

    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

    let inProjectSection = false;
    const projects = [];
    let currentProject = null;

    for (let line of lines) {
        const lower = line.toLowerCase();

        // Start section
        if (lower.includes("project experience")) {
            inProjectSection = true;
            continue;
        }

        // End section
        if (inProjectSection && lower.includes("education")) {
            break;
        }

        if (!inProjectSection) continue;

        // 🔥 Detect NEW PROJECT (IMPORTANT LOGIC)
        if (
            line.includes(" - ") ||
            line.includes("Application") ||
            line.includes("Web App")
        ) {
            if (currentProject) {
                projects.push(currentProject);
            }

            const cleanTitle = line.split("(")[0].trim();

            currentProject = {
                title: cleanTitle,
                description: "",
                techStack: []
            };
        }

        // Tech Stack detection
        else if (lower.includes("tech stack")) {
            if (currentProject) {
                currentProject.techStack = line
                    .replace(/tech stack:/i, "")
                    .split(",")
                    .map(t => t.trim());
            }
        }

        // Description
        else {
            if (currentProject) {
                currentProject.description += line + " ";
            }
        }
    }

    if (currentProject) {
        projects.push(currentProject);
    }

    return projects;
};