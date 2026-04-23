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
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl">

            <h3 className="text-xl font-extrabold text-[#3b3a4a] mb-6">
                Update Preferences
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                <select
                    name="targetRole"
                    value={form.targetRole}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl bg-indigo-100/30 shadow-md text-slate-500 outline-none"
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

                <div className="flex flex-col md:flex-row gap-3">

                    <input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="Skill Name"
                        className="flex-1 px-5 py-4 rounded-2xl bg-indigo-100/30 shadow-md"
                    />

                    <select
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value)}
                        className="px-5 py-4 rounded-2xl bg-indigo-100/30 shadow-md"
                    >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>

                    <button
                        onClick={handleAddSkill}
                        className="px-8 py-3 bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold rounded-2xl shadow-lg"
                    >
                        Add
                    </button>

                </div>

            </div>

        </div>
    );
};

export default PreferencesCard;