export const groupInviteTemplate = (inviterName: string, groupName: string) => {
    return `
        <div style="font-family: Arial; padding: 20px;">
            <h1>Todo</h1>
            <h2>🎉 You've been invited!</h2>
            <p><strong>${inviterName}</strong> added you to the group:</p>
            <h3>${groupName}</h3>

            <p>You can now start collaborating 🚀</p>

            <hr />
            <small>Todo App</small>
        </div>
    `;
};
