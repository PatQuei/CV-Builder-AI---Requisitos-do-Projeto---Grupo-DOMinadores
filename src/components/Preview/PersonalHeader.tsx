type PersonalHeaderProps = {
  name: string;
  title: string;
  email: string;
  phone: string;
};


export default function PersonalHeader({ 
    name,
    title,
    email, 
    phone,
 }: PersonalHeaderProps) {
  return (
    <header className="personal-header">
      <h1>{name}</h1>
      <h2>{title}</h2>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
    </header>
  );
}