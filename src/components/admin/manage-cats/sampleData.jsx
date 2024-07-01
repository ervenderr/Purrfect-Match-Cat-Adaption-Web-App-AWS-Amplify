const originData = [];
for (let i = 0; i < 20; i++) {
    originData.push({
        key: i.toString(),
        name: `Edward ${i}`,
        age: 32,
        breed: "Orens",
        status: "Available",
        description: `lorem ipsum. lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum`,
        photo: <img src={`https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} alt={`Cat ${i}`} style={{ width: '100px', height: '100px' }} />
    });
}

export default originData;