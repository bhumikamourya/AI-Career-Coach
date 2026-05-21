const PreferencesCard = ({
    form,
    handleChange,
    handleUpdate,
    skillInput,
    setSkillInput,
    skillLevel,
    setSkillLevel,
    handleAddSkill,
    roles
}) => {

    return (

        <div className="bg-gradient-to-br from-[#d9d4ff]/40 to-[#ffecde]/40 backdrop-blur-xl border border-white/60 p-5 sm:p-7 md:p-[50px] rounded-[2.5rem] shadow-xl w-full overflow-hidden">

            <h3 className="text-xl font-extrabold text-[#3b3a4a] mb-6">
                Update Preferences
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                <select
                    name="targetRole"
                    value={form.targetRole}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl bg-white/80 shadow-md text-slate-500 outline-none"
                >

                    <option value="">Select Role</option>

                    {roles.map((role) => (
                        <option key={role._id} value={role.name}>
                            {role.name}
                        </option>
                    ))}

                </select>

                <button
                    onClick={handleUpdate}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold shadow-lg"
                >
                    Save Preferences
                </button>

            </div>

            <div className="pt-6 border-t border-slate-100">

                <div className="flex flex-col xl:flex-row gap-3 w-full">

                    <input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="Skill Name"
                        className="flex-1 min-w-0 px-5 py-4 rounded-2xl bg-white/80 shadow-md"
                    />

                    <select
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value)}
                        className="w-full xl:w-[180px] px-5 py-4 rounded-2xl bg-white/80 shadow-md"
                    >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>

                    <button
                        onClick={handleAddSkill}
                        className="w-full xl:w-auto px-8 py-4 bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold rounded-2xl shadow-lg whitespace-nowrap"
                    >
                        Add
                    </button>

                </div>

            </div>

        </div>

    );
};

export default PreferencesCard;