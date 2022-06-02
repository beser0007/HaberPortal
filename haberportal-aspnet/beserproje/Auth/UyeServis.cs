using beserproje.Models;
using beserproje.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace beserproje.Auth
{
    public class UyeServis
    {
        DB01Entities db = new DB01Entities();
        public UyelerModel UyeOturumAc(string UyeMail, string parola)
        {
            UyelerModel uye = db.Uyeler.Where(s => s.UyeMail == UyeMail && s.UyeParola == parola).Select(x => new UyelerModel()
            {
                UyeID = x.UyeID,
                UyeAdSoyad = x.UyeAdSoyad,
                UyeMail = x.UyeMail,
                UyeYas = x.UyeYas,
                UyeTarih = x.UyeTarih,
                UyeParola = x.UyeParola,
                UyeYetki = x.UyeYetki
            }).SingleOrDefault();
            return uye;

        }
    }
}