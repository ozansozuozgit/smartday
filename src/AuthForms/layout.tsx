export default async function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className='main-body'>
      {props.modal}
      {props.children}
    </div>
  );
}
