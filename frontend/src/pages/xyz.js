<div className='mywrapper'>
<div>
<section className="container">
  
  
  <form onSubmit={handleSubmit} className="form">
  {/* <img src={tick}  className='submitimg'></img> */}
    <button type="submit" className="submit">
<h1 className="donebtn">Submit</h1>
</button>
<div className="container2">
    <input type="file" id="file" accept="image/*" hidden onChange={handleFileChange} />
    <div className="img-area" data-img="">
      <img src={profileIcon} width="100px" height="100px" alt="Profile" />
    </div>
    <button className="select-image" onClick={handleSelectImage} type='button'>
      <img src={edit} width="40px" height="40px" alt="Select"  className='editpng'/>
    </button>
  </div>
    <div className="input-box">
      <label>Linkhub Alias</label>
      <input type="text" placeholder="What should we call this LinkHub?"  value={formData.alias} name="alias" onChange={handleVariation} required />
    </div>
    <div className="row">
      <div className="input-box">
        <label>Email</label>
        <input type="text" placeholder="Enter Email"  value={formData.email} name="email" onChange={handleVariation} />
      </div>
      <div className="input-box">
        <label>Phone Number</label>
        <input type="text" placeholder="Enter Phone Number" value={formData.phoneNumber} name="phoneNumber" onChange={handleVariation}/>
      </div>
    </div>
    <div className="input-box">
      <label>Bio</label>
      {/* <textarea placeholder="Enter your bio"></textarea> */}
      <div style={{ width: 650, height: 70, borderRadius: '6px' }} className='quillbox'> 
          <div ref={quillRef} style={{ borderRadius: '6px' }} />
      </div>
    </div>
    <div className="socials">Socials</div>
    <div className="row-handles">
      <div className="handles">
        <img src={github} height="50px" width="50px" alt="Instagram" />
        <div className="input-box-handles"><input type="text" value={formData.github} name="github" onChange={handleVariation} placeholder="id" /></div>
      </div>
      <div className="handles">
        <img src={xlogo} height="50px" width="50px" alt="Instagram" />
        <div className="input-box-handles"><input type="text" placeholder="id" value={formData.x} name="x" onChange={handleVariation} /></div>
      </div>
    </div>
    <div className="row-handles">
      <div className="handles">
        <img src={yt} height="50px" width="50px" alt="Instagram" />
        <div className="input-box-handles"><input type="text" placeholder="id"  value={formData.yt} name="yt" onChange={handleVariation}/></div>
      </div>
      <div className="handles">
        <img src={instagramIcon} height="47px" width="47px" alt="Instagram" />
        <div className="input-box-handles"><input type="text" placeholder="id" value={formData.insta} name="insta" onChange={handleVariation} /></div>
      </div>
    </div>
    
    <button type = "button" onClick={handleAdd} className='addbutton'><img src={add} width="30px" height={"30px"} ></img></button>
  {urls.map((url, index) => (
    <div className="input-box2" key={index}>
      <img
        src={favicons[index] || question}
        // alt={github}
        style={{ width: '40px', height: '40px' }}
        className="addsocialsicon"
        
        id="icon"
      />
      <input
        type="url"
        placeholder="Enter a URL"
        value={url}
        onChange={(e) => handleInputChange(e, index)}
      />
       <input
        type="text"
        placeholder="Name"
        value={names[index] || ''}
        onChange={(e) => {
          const newNames = [...names];
          newNames[index] = e.target.value;
          setNames(newNames);
        }}
      />

      <button onClick={() => handleDelete(index)} className='deletebutton'><img src={cross} width={35} height={35}></img></button>
    </div>
  ))}
   
  </form>
  
</section>
  <Text/>
  <Logo/>
  
</div>
</div>